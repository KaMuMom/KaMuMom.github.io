---
title: "使用 Next.js 构建静态博客"
date: "2025-12-15"
excerpt: "详细介绍如何使用 Next.js 14 和 Tailwind CSS 构建一个现代化的静态博客，并部署到 GitHub Pages。"
tags: ["Next.js", "React", "静态网站", "GitHub Pages"]
---

# 使用 Next.js 构建静态博客

在这篇文章中，我将详细介绍如何使用 Next.js 14 和 Tailwind CSS 构建一个现代化的静态博客，并部署到 GitHub Pages。

## 为什么选择 Next.js？

Next.js 是一个基于 React 的全栈框架，特别适合构建静态网站和博客。它的主要优势包括：

### 1. 静态站点生成 (SSG)
Next.js 可以在构建时预渲染页面为静态 HTML，这带来了：
- 极快的加载速度
- 良好的 SEO 表现
- 低廉的托管成本

### 2. 文件系统路由
基于文件的页面路由系统让创建新页面变得非常简单：
```
src/app/
├── page.tsx          # 首页
├── about/
│   └── page.tsx      # 关于页面
└── posts/
    ├── page.tsx      # 文章列表
    └── [slug]/
        └── page.tsx  # 文章详情
```

### 3. 丰富的生态系统
Next.js 与 React 生态系统完美集成，可以使用各种优秀的组件库和工具。

## 项目结构设计

一个典型的博客项目结构如下：

```
blog/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   ├── about/        # 关于页面
│   │   └── posts/        # 文章相关页面
│   ├── components/       # 可复用组件
│   ├── lib/             # 工具函数
│   └── styles/          # 样式文件
├── posts/               # Markdown 文章
├── public/              # 静态资源
└── package.json
```

## 处理 Markdown 文章

博客的核心是文章管理。我们使用 `gray-matter` 和 `remark` 来处理 Markdown 文件：

### 1. 解析文章元数据
```typescript
import matter from 'gray-matter'

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    // ...
  }
}
```

### 2. 转换 Markdown 为 HTML
```typescript
import { remark } from 'remark'
import html from 'remark-html'

const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
const contentHtml = processedContent.toString()
```

## 样式设计

使用 Tailwind CSS 可以快速构建美观的界面：

### 1. 响应式设计
```jsx
<div className="max-w-4xl mx-auto px-4 py-8">
  <div className="grid gap-6 md:grid-cols-2">
    {/* 内容 */}
  </div>
</div>
```

### 2. 组件化样式
```jsx
<article className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
  <p className="text-gray-600">{excerpt}</p>
</article>
```

## 部署到 GitHub Pages

### 1. 配置 Next.js 导出
在 `next.config.js` 中配置静态导出：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 2. 自动部署流程
使用 GitHub Actions 可以实现自动部署：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 性能优化

### 1. 图片优化
虽然静态导出模式下不能使用 Next.js 的图片优化，但可以：
- 使用适当的图片格式（WebP）
- 提供多种尺寸的图片
- 实现懒加载

### 2. 代码分割
Next.js 自动进行代码分割，确保只加载必要的 JavaScript。

### 3. 预加载关键资源
```jsx
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="" />
```

## 总结

使用 Next.js 构建静态博客是一个很好的选择，它提供了：
- 优秀的开发体验
- 强大的性能
- 灵活的部署选项
- 丰富的生态系统

通过合理的设计和优化，可以构建一个快速、美观、易维护的博客网站。

希望这篇文章对你有所帮助！如果你有任何问题或建议，欢迎留言讨论。