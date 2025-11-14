# GitHub仓库操作指南

## 1. GitHub账号准备

### 1.1 注册GitHub账号
1. 访问 [GitHub官网](https://github.com)
2. 点击右上角的「Sign up」
3. 输入邮箱、用户名和密码
4. 完成验证步骤
5. 选择合适的计划（免费版即可开始）
6. 根据提示完成初始化设置

### 1.2 配置SSH密钥（推荐）

**生成SSH密钥对**：

Windows (PowerShell)：
```powershell
# 生成新的SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 或者如果系统不支持ed25519算法
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Linux/Mac：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**将SSH密钥添加到GitHub**：

1. 复制公钥内容：
   - Windows: `cat ~/.ssh/id_ed25519.pub`
   - Linux/Mac: `pbcopy < ~/.ssh/id_ed25519.pub`

2. 登录GitHub，点击右上角头像 → Settings → SSH and GPG keys → New SSH key
3. 粘贴公钥内容，设置标题，点击Add SSH key

## 2. 创建GitHub仓库

### 2.1 新建仓库

1. 登录GitHub后，点击右上角「+」→ New repository
2. 填写仓库信息：
   - Repository name: 仓库名称（必填）
   - Description: 仓库描述（可选）
   - Public/Private: 公开/私有仓库
   - Initialize this repository with: 可选择初始化内容
     - Add a README file: 添加README文件
     - Add .gitignore: 添加.gitignore文件
     - Choose a license: 选择许可证
3. 点击「Create repository」

### 2.2 仓库初始化选项说明

- **README文件**：介绍项目的文档
- **.gitignore文件**：指定不需要跟踪的文件和目录
- **许可证**：定义代码的使用权限

## 3. 本地仓库与GitHub连接

### 3.1 已存在本地Git仓库

```bash
# 添加远程仓库（替换为实际URL）
git remote add origin git@github.com:username/repository.git

# 推送到远程仓库
git push -u origin master
```

### 3.2 克隆现有GitHub仓库

```bash
# 使用SSH方式（推荐）
git clone git@github.com:username/repository.git

# 或者使用HTTPS方式
git clone https://github.com/username/repository.git
```

### 3.3 首次推送技巧

如果本地和远程历史不同，使用：

```bash
git pull origin master --allow-unrelated-histories
git push -u origin master
```

## 4. GitHub仓库基本设置

### 4.1 仓库基本信息设置

1. 进入仓库 → Settings → General
2. 可修改：
   - 仓库名称
   - 仓库描述
   - 仓库可见性（公开/私有）
   - 仓库主题标签
   - 网站链接
   - 默认分支

### 4.2 Collaborators（协作者）设置

1. Settings → Manage access → Invite a collaborator
2. 输入协作者GitHub用户名/邮箱
3. 协作者接受邀请后即可参与开发

### 4.3 Branches（分支）保护规则

1. Settings → Branches → Add rule
2. 设置需要保护的分支名称（如master/main）
3. 可选保护规则：
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Restrict who can push to matching branches
   - Enable signed commits

## 5. GitHub高级功能使用

### 5.1 Issues管理

1. 进入仓库 → Issues → New issue
2. 填写标题和描述
3. 可选功能：
   - Assign people: 分配给团队成员
   - Labels: 添加标签
   - Milestone: 设置里程碑
   - Projects: 添加到项目看板

### 5.2 Pull Requests（PR）

1. 确保在本地创建并切换到新分支开发
2. 推送新分支到GitHub
3. 进入仓库 → Pull requests → New pull request
4. 选择要合并的源分支和目标分支
5. 填写PR标题和描述
6. 点击「Create pull request」
7. 团队成员可以在PR页面进行代码审查和讨论
8. 审查通过后，点击「Merge pull request」合并代码

### 5.3 Projects（项目看板）

1. 进入仓库 → Projects → New project
2. 选择模板：
   - 基本看板
   - 自动化看板
   - 空白看板
3. 自定义列（如：待办、进行中、已完成）
4. 添加卡片，可关联Issues和PR

### 5.4 Wiki文档

1. 进入仓库 → Wiki → Create the first page
2. 创建首页内容
3. 后续可添加更多页面
4. 支持Markdown格式编辑

### 5.5 Actions（自动化）

1. 进入仓库 → Actions → New workflow
2. 选择模板或创建自定义工作流
3. 编辑`.github/workflows/workflow-name.yml`文件
4. 配置触发条件和执行步骤
5. 保存后，工作流将按配置自动运行

## 6. GitHub最佳实践

### 6.1 提交规范

- 提交信息要简洁明了
- 使用英文或统一语言
- 遵循特定格式（如：type(scope): description）

### 6.2 分支管理

- **master/main**：稳定版本分支
- **develop**：开发分支
- **feature/xxx**：新功能开发分支
- **bugfix/xxx**：bug修复分支
- **release/xxx**：版本发布分支

### 6.3 代码审查

- 建立代码审查流程
- 要求至少一人审查才能合并
- 使用评论功能提供建设性反馈

### 6.4 文档维护

- 保持README文件更新
- 维护清晰的Wiki文档
- 为Issues和PR编写详细描述

## 7. 常见问题解决

### 7.1 忘记密码/无法登录

- 使用「Forgot password」功能
- 检查邮箱中的重置链接

### 7.2 SSH连接问题

```bash
# 测试SSH连接
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh -T git@github.com
```

### 7.3 权限不足

- 确认是否为仓库协作者
- 检查分支保护规则
- 验证SSH密钥配置是否正确

### 7.4 大型文件上传

- 使用Git LFS（Large File Storage）
```bash
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

## 8. 安全提示

- **不要**提交敏感信息（API密钥、密码、证书等）
- 使用环境变量或`.env`文件管理敏感信息
- 定期更新依赖包以修复安全漏洞
- 启用GitHub的安全警报功能
- 定期审查协作者列表

## 9. GitHub Enterprise（企业版）简介

如果团队需要更多高级功能，可以考虑GitHub Enterprise：
- 私有部署选项
- 高级安全和合规功能
- 企业级支持
- 高级身份验证和访问控制