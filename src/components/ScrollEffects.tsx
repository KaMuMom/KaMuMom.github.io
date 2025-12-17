'use client'

import { useState, useEffect } from 'react'

export default function ScrollEffects({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // 当滚动超过 50px 时显示页眉
      if (currentScrollY > 50) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 计算欢迎页面的缩放和透明度
  const welcomeScale = Math.max(0.5, 1 - scrollY / 1000)
  const welcomeOpacity = Math.max(0, 1 - scrollY / 500)

  return (
    <>
      {/* 欢迎页面容器 */}
      <div 
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          transform: `scale(${welcomeScale})`,
          opacity: welcomeOpacity,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
      >
        {children}
      </div>
      
      {/* 页眉显示状态 */}
      <div id="header-visibility" data-show={showHeader} />
    </>
  )
}