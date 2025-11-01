# Git仓库初始化步骤笔记

## 1. 检查当前目录是否已有Git环境

在初始化新的Git仓库前，先检查当前目录是否已经有Git环境：

```bash
# 查看当前目录的Git状态
git status
```

如果显示已在Git仓库中，则无需重新初始化；如果显示"not a git repository"，则需要初始化。

## 2. 初始化Git仓库

在项目根目录执行初始化命令：

```bash
# 初始化新的Git仓库
git init
```

这会在当前目录创建一个`.git`隐藏目录，包含Git仓库的所有必要文件。

## 3. 配置.gitignore文件

确保项目中包含一个合理的`.gitignore`文件，用于忽略不需要版本控制的文件：

```bash
# 查看.gitignore文件内容
cat .gitignore
```

标准的`.gitignore`应包含：
- 依赖目录（如`node_modules/`）
- 构建输出目录（如`dist/`、`.unpackage/`）
- 日志文件（如`logs/`、`*.log`）
- 编辑器配置文件（如`.vscode/`、`.idea/`）
- 环境变量文件（如`.env.*`）
- OS生成的文件（如`Thumbs.db`）

## 4. 添加文件到暂存区

将项目文件添加到Git暂存区：

```bash
# 添加所有文件
git add .

# 或者添加特定文件
git add 文件路径1 文件路径2 ...
```

## 5. 创建初始提交

提交暂存区中的文件：

```bash
git commit -m "初始化项目"
```

## 6. 配置远程仓库

如果需要与远程仓库同步，添加远程仓库地址：

```bash
# 添加远程仓库（替换为实际的仓库URL）
git remote add origin https://github.com/username/repository.git
```

## 7. 拉取远程仓库内容（如有）

如果远程仓库已有内容，先拉取以避免冲突：

```bash
# 拉取远程master分支并合并
git pull origin master --allow-unrelated-histories
```

## 8. 推送到远程仓库

将本地提交推送到远程仓库：

```bash
# 推送本地master分支到远程
git push -u origin master
```

## 9. 查看Git仓库状态

确认所有操作已完成：

```bash
# 查看当前Git状态
git status

# 查看提交历史
git log
```

## 常见问题解决

### 撤销最近的提交

如果需要撤销最近的提交但保留更改：

```bash
# 撤销最近一次提交，更改保留在暂存区
git reset --soft HEAD~1
```

### 删除Git仓库

如果需要完全移除Git仓库（删除`.git`目录）：

Windows PowerShell：
```powershell
# 查看隐藏目录
Get-ChildItem -Hidden

# 删除.git目录
Remove-Item -Force -Recurse .git
```

Linux/Mac：
```bash
# 删除.git目录
rm -rf .git
```

## 注意事项

- 确保不要将敏感信息（如API密钥、密码）提交到Git仓库
- 定期提交代码，保持提交信息清晰明了
- 大型项目应考虑使用分支管理功能
- 推送到远程仓库前确保代码可以正常构建运行