# GitHub 部署指南

## 前提条件

1. 安装 [Git](https://git-scm.com/downloads)
2. 拥有一个 [GitHub](https://github.com/) 账户

## 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称使用 `your-username.github.io`（将 `your-username` 替换为你的 GitHub 用户名）
4. 选择 "Public"
5. 不要初始化 README、.gitignore 或 license
6. 点击 "Create repository"

### 2. 初始化本地 Git 仓库

在项目目录中打开命令行：

```bash
git init
git add .
git commit -m "Initial commit: Personal blog with Next.js"
```

### 3. 关联远程仓库

```bash
git remote add origin https://github.com/your-username/your-username.github.io.git
git branch -M main
git push -u origin main
```

### 4. 启用 GitHub Pages

1. 在你的 GitHub 仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分，选择 "GitHub Actions"
4. 保存设置

### 5. 配置 GitHub Actions

项目已经配置好了 GitHub Actions 工作流文件 `.github/workflows/deploy.yml`。

当你推送代码到 `main` 分支时，GitHub Actions 会自动：
1. 构建项目
2. 部署到 GitHub Pages

### 6. 等待部署完成

1. 在 GitHub 仓库中点击 "Actions" 标签查看构建状态
2. 构建完成后，你的博客会部署到：`https://your-username.github.io`

## 更新博客

### 添加新文章

1. 在 `posts` 目录下创建新的 Markdown 文件
2. 文件名格式：`article-title.md`
3. 添加 frontmatter：

   ```markdown
   ---
   title: "文章标题"
   date: "2025-12-16"
   excerpt: "文章摘要"
   tags: ["标签1", "标签2"]
   ---
   
   文章内容...
   ```

### 发布更新

```bash
git add .
git commit -m "Add new article: 文章标题"
git push origin main
```

推送后，GitHub Actions 会自动构建和部署更新。

## 自定义域名（可选）

如果你有自己的域名：

1. 在 `public` 目录下创建 `CNAME` 文件：

   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. 提交并推送：

   ```bash
   git add public/CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

3. 在 GitHub 仓库的 Settings > Pages 中配置你的域名

4. 在你的域名提供商处配置 DNS：
   - 添加 CNAME 记录：`www` → `your-username.github.io`
   - 或添加 A 记录指向 GitHub Pages IP

## 故障排除

### 构建失败

1. 检查 GitHub Actions 的错误日志
2. 确保所有依赖都正确安装
3. 检查 Markdown 文件的格式是否正确

### 页面显示 404

1. 确保仓库是公开的
2. 检查 GitHub Pages 是否已启用
3. 等待几分钟让 DNS 传播

### 样式问题

1. 确保 Tailwind CSS 配置正确
2. 检查 `next.config.js` 中的静态导出配置

## 维护建议

1. 定期更新依赖：
   ```bash
   npm update
   ```

2. 定期备份你的文章内容

3. 考虑使用 GitHub 的 Releases 功能来标记重要版本

4. 监控网站性能和加载速度

## 更多资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Markdown 语法指南](https://www.markdownguide.org/basic-syntax/)