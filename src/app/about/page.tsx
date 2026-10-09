import Link from 'next/link'

export default function About() {
  return (
    <div className="page-stack">
      <div className="page-intro reveal-up">
        <div className="page-intro-copy">
          <span className="eyebrow">A LITTLE ABOUT ME</span>
          <h1 className="page-title">关于我</h1>
          <p className="page-intro-description">你好，很高兴在这里遇见你。下面是关于这个博客和正在写它的人。</p>
        </div>
        <Link href="/posts" className="section-link">去读几篇文章 <span aria-hidden="true">↗</span></Link>
      </div>

      <div className="about-layout">
        <aside className="about-panel about-profile reveal-up reveal-delay-1">
          <div className="about-avatar" aria-hidden="true">小</div>
          <span className="eyebrow">XIAOYUGAN / DEVELOPER</span>
          <h2>小鱼干</h2>
          <p>一名热爱技术和分享的开发者，正在把好奇心变成一个个小项目。</p>
          <div className="about-links">
            <a href="mailto:ldf.fish@foxmail.com">ldf.fish@foxmail.com ↗</a>
            <a href="https://github.com/KaMuMom" target="_blank" rel="noopener noreferrer">github.com/KaMuMom ↗</a>
          </div>
        </aside>

        <article className="about-panel about-copy reveal-up reveal-delay-2">
          <h2>我的背景</h2>
          <p>我拥有多年的软件开发经验，专注于前端开发和用户体验设计。我相信技术应该服务于人，让生活变得更美好。</p>

          <h2>我的兴趣</h2>
          <ul>
            <li>Web开发和现代前端框架</li>
            <li>用户体验设计和界面优化</li>
            <li>开源项目和技术社区</li>
            <li>人工智能和机器学习</li>
            <li>摄影和旅行</li>
          </ul>

          <h2>这个博客</h2>
          <p>这里是我分享技术心得、生活感悟和学习笔记的地方。我希望通过写作整理自己的思路，也希望这些内容能帮助到其他开发者。</p>
          <p>博客使用 Next.js 和 Tailwind CSS 构建，代码托管在 GitHub 上，通过 GitHub Pages 部署。</p>
        </article>
      </div>
    </div>
  )
}
