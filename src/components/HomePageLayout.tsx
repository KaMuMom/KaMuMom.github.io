'use client'

import { useEffect } from 'react'

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 隐藏页眉
    const header = document.getElementById('main-header')
    if (header) {
      header.style.display = 'none'
    }

    // 滚动时显示页眉
    const handleScroll = () => {
      if (window.scrollY > 100) {
        if (header) {
          header.style.display = 'block'
        }
      } else {
        if (header) {
          header.style.display = 'none'
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // 清理时显示页眉
      if (header) {
        header.style.display = 'block'
      }
    }
  }, [])

  return <>{children}</>
}