# 我的个人博客

这是一个使用 [Next.js](https://nextjs.org/) 和 [Tailwind CSS](https://tailwindcss.com/) 构建的现代化个人博客。

## 特性

- 🚀 基于 Next.js 14 的静态站点生成
- 🎨 使用 Tailwind CSS 的现代化设计
- 📱 完全响应式，支持移动设备
- ⚡ 极快的加载速度和优秀的 SEO
- 📝 支持 Markdown 文章写作
- 🏷️ 文章标签系统
- 🌐 部署在 GitHub Pages

## 开始使用

### 环境要求

- Node.js 18 或更高版本
- npm 或 yarn

### 本地开发

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/your-username.github.io.git
   cd your-username.github.io
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 添加新文章

1. 在 `posts` 目录下创建新的 Markdown 文件
2. 文件名格式：`article-title.md`
3. 文件开头添加 frontmatter：

   ```markdown
   ---
   title: "文章标题"
   date: "2025-12-16"
   excerpt: "文章摘要"
   tags: ["标签1", "标签2"]
   ---
   
   文章内容...
   ```

### 构建和部署

1. 构建静态文件
   ```bash
   npm run build
   ```

2. 构建后的文件会在 `out` 目录中

3. 部署到 GitHub Pages（自动）
   - 推送到 `main` 分支会自动触发部署
   - 网站会部署到 `https://yourusername.github.io`

## 项目结构

```
blog/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   ├── about/        # 关于页面
│   │   └── posts/        # 文章相关页面
│   ├── components/       # 可复用组件
│   └── lib/             # 工具函数
├── posts/               # Markdown 文章
├── public/              # 静态资源
├── .github/             # GitHub Actions
└── package.json
```

## 自定义配置

### 修改网站信息

编辑 `src/app/layout.tsx` 文件中的 metadata：

```typescript
export const metadata: Metadata = {
  title: '你的博客标题',
  description: '你的博客描述',
}
```

### 修改样式

项目使用 Tailwind CSS，可以：
1. 修改 `tailwind.config.js` 自定义主题
2. 在组件中使用 Tailwind 类名
3. 添加自定义 CSS 到 `src/app/globals.css`

### 添加页面

在 `src/app` 目录下创建新的文件夹和 `page.tsx` 文件。

## 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **Markdown**: gray-matter, remark
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！