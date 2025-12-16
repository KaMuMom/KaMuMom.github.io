---
title: "用 Next.js 搭建静态博客，原来这么简单！"
date: "2025-12-15"
excerpt: "今天跟大家分享一下我是怎么用 Next.js 14 和 Tailwind CSS 搭建这个博客的，还有部署到 GitHub Pages 的全过程。"
tags: ["Next.js", "React", "静态网站", "GitHub Pages"]
---

# 用 Next.js 搭建静态博客，原来这么简单！

今天想跟大家分享一下我是怎么用 Next.js 14 和 Tailwind CSS 搭建这个博客的，整个过程还挺有趣的，希望能帮到想搭建自己博客的朋友们！

## 为什么选 Next.js？

说实话，市面上能用来搭建博客的框架挺多的，比如 Hugo、Jekyll、Gatsby 等等。但我最后还是选择了 Next.js，主要是有这么几个原因：

### 1. 静态生成太香了
Next.js 可以在构建的时候就把所有页面生成成静态 HTML 文件，这样做出来的网站：
- 打开速度超级快
- SEO 效果很好（搜索引擎更容易收录）
- 部署成本很低（GitHub Pages 免费就够了）

### 2. 路由系统很直观
Next.js 的路由系统特别简单，基本上就是文件路径就是 URL 路径：
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
不用额外配置，创建文件就有对应页面，是不是很方便？

### 3. React 生态很强大
React 的组件库和工具链真的很丰富，基本上想要什么功能都能找到现成的解决方案。而且如果你会 React 的话，学习成本基本为零。

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