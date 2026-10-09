'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const programmerBlessings = [
  '代码永远不崩溃',
  'Bug自动修复',
  '需求不再变更',
  '编译一次通过',
  '服务器永不宕机',
  '数据库永不丢失',
  '缓存命中率 100%',
  'API响应时间 < 1ms',
  '测试覆盖率 100%',
  '代码审查一次通过',
  '部署零错误',
  '用户永远满意',
  '产品经理不提新需求',
  '老板不催进度',
  '咖啡永远续杯',
]

interface WelcomeBannerProps {
  postCount: number
  tagCount: number
  latestDate?: string
}

export default function WelcomeBanner({ postCount, tagCount, latestDate }: WelcomeBannerProps) {
  const [currentBlessing, setCurrentBlessing] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [blessingIndex, setBlessingIndex] = useState(0)

  useEffect(() => {
    const currentFullBlessing = programmerBlessings[blessingIndex]
    const typingTimeout = window.setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentFullBlessing.length) {
        setCurrentBlessing((previous) => previous + currentFullBlessing[currentCharIndex])
        setCurrentCharIndex((index) => index + 1)
      } else if (!isDeleting && currentCharIndex === currentFullBlessing.length) {
        setIsDeleting(true)
      } else if (isDeleting && currentCharIndex > 0) {
        setCurrentBlessing((previous) => previous.slice(0, -1))
        setCurrentCharIndex((index) => index - 1)
      } else {
        setIsDeleting(false)
        setBlessingIndex((index) => (index + 1) % programmerBlessings.length)
      }
    }, !isDeleting && currentCharIndex === currentFullBlessing.length ? 2100 : isDeleting ? 46 : 86)

    return () => window.clearTimeout(typingTimeout)
  }, [blessingIndex, currentCharIndex, isDeleting])

  return (
    <section className="hero-grid reveal-up" aria-labelledby="welcome-title">
      <div className="hero-content">
        <span className="eyebrow">小鱼干 / PERSONAL BLOG</span>
        <h1 id="welcome-title" className="hero-title">把灵感写成可读的东西。</h1>
        <p className="hero-description">
          这里是小鱼干的数字花园，记录技术、生活，以及那些值得慢慢想清楚的事情。
        </p>
        <div className="hero-blessing" aria-live="polite">
          <span className="hero-blessing-dot" aria-hidden="true" />
          <span>{currentBlessing || '欢迎来到小鱼干的个人博客'}<span aria-hidden="true">▋</span></span>
        </div>
        <div className="hero-actions">
          <Link href="/posts" className="button-primary">浏览文章 <span aria-hidden="true">↗</span></Link>
          <Link href="/about" className="button-secondary">认识我</Link>
        </div>
      </div>

      <div className="hero-aside reveal-up reveal-delay-2" aria-label="博客概览">
        <div className="hero-orbit" aria-hidden="true" />
        <span className="hero-aside-label">A small corner on the internet</span>
        <p className="hero-aside-quote">“写下来，想法才有机会变成下一步。”</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{postCount}</span>
            <span className="hero-stat-label">篇文章</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{tagCount}</span>
            <span className="hero-stat-label">个主题</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{latestDate?.slice(0, 4) || '—'}</span>
            <span className="hero-stat-label">最近更新</span>
          </div>
        </div>
      </div>
    </section>
  )
}
