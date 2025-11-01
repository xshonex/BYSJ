# Git连接问题解决方案

## 问题分析

Terminal#501-502 显示的错误：
```
fatal: unable to access 'https://github.com/xshonex/BYSJ/': Recv failure: Connection was reset
```

这是典型的GitHub连接失败错误，可能由以下原因引起：
1. 网络连接不稳定
2. HTTPS连接问题
3. GitHub服务器临时不可用
4. 防火墙或代理设置限制

## 解决方案

### 方法1：检查网络连接

```powershell
# 测试网络连接
ping github.com

# 测试HTTPS连接
Test-NetConnection github.com -Port 443
```

### 方法2：切换到SSH协议（推荐）

1. **检查是否已配置SSH密钥**：
```powershell
ls -la ~/.ssh/
```

2. **如果没有SSH密钥，生成新的密钥**：
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. **添加SSH密钥到SSH代理**：
```powershell
Start-Service ssh-agent
ssh-add ~/.ssh/id_ed25519
```

4. **查看公钥内容并添加到GitHub**：
```powershell
Get-Content ~/.ssh/id_ed25519.pub
```
复制输出内容，添加到GitHub账号的SSH密钥设置中。

5. **修改远程仓库URL为SSH格式**：
```powershell
git remote set-url origin git@github.com:xshonex/BYSJ.git
```

### 方法3：修改HTTPS代理设置

如果需要使用代理服务器：

```powershell
# 设置HTTPS代理
git config --global https.proxy http://proxy.example.com:8080

# 或者设置SOCKS代理
git config --global https.proxy socks5://127.0.0.1:1080

# 取消代理设置
git config --global --unset https.proxy
```

### 方法4：修改HTTPS连接设置

```powershell
# 配置HTTPS连接超时
git config --global http.postBuffer 524288000

# 禁用SSL验证（不推荐，仅作为临时解决方案）
git config --global http.sslVerify false
```

### 方法5：更换GitHub镜像源

```powershell
# 修改远程仓库URL为镜像源
git remote set-url origin https://github.com.cnpmjs.org/xshonex/BYSJ.git

# 或者
git remote set-url origin https://hub.fastgit.org/xshonex/BYSJ.git
```

### 方法6：检查防火墙设置

1. 临时关闭Windows防火墙试试
2. 检查杀毒软件是否拦截Git连接
3. 在防火墙中添加Git的出站规则

### 方法7：重试操作

GitHub有时候会有临时的服务器问题，稍后重试可能会解决：

```powershell
# 等待几分钟后重试
git pull --rebase origin master
```

## 后续验证

修复连接问题后，可以通过以下命令验证是否成功：

```powershell
# 测试SSH连接（如果使用SSH）
ssh -T git@github.com

# 查看远程仓库信息
git remote -v

# 尝试拉取代码
git fetch origin
```

## 预防措施

1. **使用SSH协议**：比HTTPS更稳定，不需要频繁输入用户名密码
2. **配置超时设置**：增加连接超时时间
3. **定期更新Git**：使用最新版本的Git客户端
4. **设置SSH密钥密码**：增加安全性
5. **定期备份代码**：避免因连接问题导致代码丢失