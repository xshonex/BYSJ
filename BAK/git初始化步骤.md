# Git仓库操作步骤笔记

## 操作一：初始化仓库

```bash
# 1. 检查当前目录是否已有Git环境
git status

# 2. 如果没有Git环境，初始化仓库
git init

# 3. 配置.gitignore文件（可选但推荐）
# 编辑.gitignore文件，添加需要忽略的文件和目录

# 4. 添加所有文件到暂存区
git add .

# 5. 创建初始提交
git commit -m "初始化项目"

# 6. 将本地分支重命名为main（现代Git仓库标准）
git branch -M main
```

## 操作二：推送仓库

```bash
# 1. 添加远程仓库（替换为实际的仓库URL）
git remote add origin https://github.com/username/repository.git

# 2. 首次推送并设置上游分支
git push -u origin main

# 3. 后续推送（已设置上游分支后）
git push
```

## 操作三：拉取仓库

```bash
# 1. 拉取远程main分支的最新代码
git pull origin main

# 2. 如果本地已有修改且有冲突，先stash修改后拉取
# git stash
# git pull origin main
# git stash pop

# 3. 查看拉取后的状态
git status
```

## 操作四：更新文件

```bash
# 1. 添加修改的文件到暂存区
# 添加所有文件
git add .
# 或者添加特定文件
# git add 文件名

# 2. 创建提交
git commit -m "更新描述"

# 3. 推送到远程main分支
# 如果已设置上游分支，可以直接使用 git push
# 否则需要指定分支
git push origin main
```

## 更新文件和推送仓库的区别

| 操作 | 概念 | 命令 | 适用场景 |
|------|------|------|----------|
| **更新文件** | 本地修改文件后，将修改保存到本地Git历史 | `git add .`<br>`git commit -m "更新描述"` | 完成了一部分工作，想要保存当前进度 |
| **推送仓库** | 将本地提交的更改上传到远程GitHub仓库 | `git push origin main` | 想要备份代码或与他人分享最新更改 |

## Git工作流程说明：为什么修改会直接推送？

### Git默认行为：
1. **无需额外确认**：Git设计理念是信任用户，`git push`命令执行时默认不会弹出确认对话框
2. **两级确认机制**：
   - 第一级：`git add` 选择要提交的文件（暂存区确认）
   - 第二级：`git commit -m "消息"` 创建提交（提交历史确认）

### 推送前检查修改的方法：

```bash
# 方法1：查看工作区修改（未暂存的更改）
git diff

# 方法2：查看暂存区修改（已add但未commit的更改）
git diff --cached

# 方法3：查看最近一次提交的修改
git show

# 方法4：查看提交历史，确认提交记录
git log --oneline -n 5

# 方法5：查看即将推送到远程的提交
git log origin/main..main  # 查看本地main比远程main多的提交
```

### 如何添加推送前确认：

```bash
# 方法1：使用Git别名添加确认步骤（修改后需重启终端）
echo 'git config --global alias.pushc "!read -p \"确定要推送吗？(y/n): \" confirm && [ \"$confirm\" = \"y\" ] && git push"' > add_confirm_push.bat

# 方法2：使用图形界面工具（如GitHub Desktop、VS Code的Git扩展），这些工具通常会在推送前显示修改摘要供您确认
```

### 主要区别：
1. **作用范围**：更新文件只影响本地仓库；推送仓库将本地更改同步到远程服务器
2. **执行顺序**：必须先更新文件（add+commit），才能推送仓库
3. **可见性**：更新文件后，只有本地可见；推送后，远程仓库也会更新，团队成员可见
4. **依赖关系**：推送仓库依赖于已完成的本地更新；本地更新不依赖于推送

## 注意事项

- 现代GitHub仓库默认分支为`main`，不再使用`master`
- 确保不要将敏感信息（如API密钥、密码）提交到Git仓库
- 提交前最好先拉取最新代码，避免冲突
- 提交信息应简洁明了，描述本次修改的内容
- 更新文件时应使用`git push origin main`而不是`git push origin master`