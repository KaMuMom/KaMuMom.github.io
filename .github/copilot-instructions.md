# 个人博客的 AI 编码代理指令

## 架构概述
这是一个使用 Next.js 14 App Router、TypeScript 和 Tailwind CSS 的静态博客。文章是 `/posts` 目录中的 Markdown 文件，通过 `gray-matter` 和 `remark` 处理 frontmatter。站点导出为静态文件，用于 GitHub Pages 部署。

## 关键组件与模式

### 文章管理 (`src/lib/posts.ts`)
- **Frontmatter 格式**: `title`, `date`, `excerpt`, `tags[]`
- **排序**: 时间线按日期降序（最新优先），列表按字母顺序
- **搜索**: 在 `PostsPage` 组件中按标题/标签进行客户端过滤
- **静态生成**: 通过 `getAllPostIds()` 生成所有文章 ID，用于动态路由

### 文件结构约定
- **文章**: `/posts/filename.md` → 路由 `/posts/filename`
- **组件**: 客户端组件在 `/src/components/`，服务端组件在 `/src/app/`
- **样式**: 使用 Tailwind 和 `@tailwindcss/typography` 处理文章内容
- **语言**: 中文 (zh-CN) 使用 Inter 字体

### 构建与部署
- **静态导出**: `next.config.js` 配置为 `output: 'export'`
- **GitHub Pages**: 通过 `.github/workflows/deploy.yml` 在推送到 main 分支时自动部署
- **构建输出**: `/out` 目录中的静态文件

## 开发工作流
1. 添加文章: 在 `/posts` 中创建 `.md` 文件并添加 frontmatter
2. 本地开发: `npm run dev` (端口 3000)
3. 构建: `npm run build` → `/out` 中的静态文件
4. 部署: 推送到 `main` 分支触发 GitHub Actions

## 代码模式
- **文章渲染**: 使用 `dangerouslySetInnerHTML` 渲染处理后的 HTML 内容
- **客户端交互**: 在 `PostsPage` 组件中实现搜索/过滤
- **动画**: 使用 `fade-in`、`stagger-animation` 等 CSS 类实现视觉效果
- **标签显示**: 蓝色徽章带悬停效果用于分类

## 常见任务
- **新文章**: 添加 Markdown 文件 → frontmatter → 内容 → 自动生成路由
- **样式**: 在 `globals.css` 中使用 Tailwind 类和自定义动画
- **搜索**: 在客户端组件中使用 `useMemo` 实现过滤结果</content>
<parameter name="filePath">d:\Desktop\blog\.github\copilot-instructions.md