import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '小鱼干的个人博客',
    template: '%s · 小鱼干的个人博客',
  },
  description: '记录技术、生活与那些值得慢慢想清楚的事情。',
}

const footerLinks = [
  { href: '/', label: '首页' },
  { href: '/posts', label: '文章' },
  { href: '/about', label: '关于我' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <div className="site-shell">
          <SiteHeader />

          <main className="site-main">{children}</main>

          <footer className="site-footer">
            <div className="site-footer-inner">
              <div className="footer-intro">
                <span className="footer-kicker">小鱼干 / 2025—现在</span>
                <p>把灵感写成可读的东西，<br />也把生活留下一点回声。</p>
              </div>

              <div className="footer-column">
                <span className="footer-label">导航</span>
                <nav className="footer-nav" aria-label="页脚导航">
                  {footerLinks.map((link) => (
                    <a key={link.href} href={link.href}>{link.label}</a>
                  ))}
                </nav>
              </div>

              <div className="footer-column footer-contact">
                <span className="footer-label">联系</span>
                <a href="mailto:ldf.fish@foxmail.com">ldf.fish@foxmail.com</a>
                <a href="https://github.com/KaMuMom" target="_blank" rel="noopener noreferrer">
                  github.com/KaMuMom ↗
                </a>
              </div>

              <div className="footer-column footer-friends">
                <span className="footer-label">友情链接</span>
                <a href="https://zuiliuab.github.io/" target="_blank" rel="noopener noreferrer">
                  Zuiliuab&apos;s Blog ↗
                </a>
              </div>
            </div>

            <div className="site-footer-bottom">
              <span>© {new Date().getFullYear()} 小鱼干的个人博客</span>
              <span>Built with Next.js · Deployed on GitHub Pages</span>
            </div>
          </footer>
        </div>
        <ThemeToggle />
      </body>
    </html>
  )
}
