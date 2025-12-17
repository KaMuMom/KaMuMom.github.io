'use client'

import { useState, useEffect } from 'react'

const programmerBlessings = [
  "代码永远不崩溃",
  "Bug自动修复",
  "需求不再变更",
  "编译一次通过",
  "服务器永不宕机",
  "数据库永不丢失",
  "缓存命中率 100%",
  "API响应时间 < 1ms",
  "测试覆盖率 100%",
  "代码审查一次通过",
  "部署零错误",
  "用户永远满意",
  "产品经理不提新需求",
  "老板不催进度",
  "咖啡永远续杯",
  "键盘永不磨损",
  "显示器永不闪烁",
  "网络延迟为 0",
  "内存永远够用",
  "CPU永远满载"
]

export default function WelcomePage() {
  const [currentBlessing, setCurrentBlessing] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [blessingIndex, setBlessingIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setShowContent(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const currentFullBlessing = programmerBlessings[blessingIndex]
    
    const typingTimeout = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentFullBlessing.length) {
        // 打字效果，偶尔出现乱码
        const shouldShowGlitch = Math.random() < 0.1
        if (shouldShowGlitch) {
          const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          setCurrentBlessing(prev => prev.slice(0, -1) + randomChar)
          setTimeout(() => {
            setCurrentBlessing(prev => prev.slice(0, -1) + currentFullBlessing[currentCharIndex])
            setCurrentCharIndex(prev => prev + 1)
          }, 50)
        } else {
          setCurrentBlessing(prev => prev + currentFullBlessing[currentCharIndex])
          setCurrentCharIndex(prev => prev + 1)
        }
      } else if (!isDeleting && currentCharIndex === currentFullBlessing.length) {
        // 完成输入，等待后开始删除
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentCharIndex > 0) {
        // 删除效果
        setCurrentBlessing(prev => prev.slice(0, -1))
        setCurrentCharIndex(prev => prev - 1)
      } else if (isDeleting && currentCharIndex === 0) {
        // 完成删除，切换到下一个祝福语
        setIsDeleting(false)
        setBlessingIndex((prev) => (prev + 1) % programmerBlessings.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(typingTimeout)
  }, [currentCharIndex, isDeleting, blessingIndex])

  // 计算缩放和透明度
  const scale = Math.max(0.5, 1 - scrollY / 1000)
  const opacity = Math.max(0, 1 - scrollY / 500)

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div className={`relative w-full h-screen overflow-hidden transition-opacity duration-1000 ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* 背景图片 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://private-user-images.githubusercontent.com/110534550/527032738-3bfcd9d2-bca7-4612-b116-ecdfdb96335f.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjU5Njc0OTcsIm5iZiI6MTc2NTk2NzE5NywicGF0aCI6Ii8xMTA1MzQ1NTAvNTI3MDMyNzM4LTNiZmNkOWQyLWJjYTctNDYxMi1iMTE2LWVjZGZkYjk2MzM1Zi5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMjE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTIxN1QxMDI2MzdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMTU5YjI2YTBhMWVkNTRlMDQ0YzZkMTUzOTQwMmM0MzYxNmY3MTM2YzhhMWYwZmNhZDc3MDM5MWExNDM3OGU3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.9Nos-R6PR6SjjGH7aqe8A6qoYVcFA0WAwmqsfeAhOio)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* 半透明遮罩 */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* 内容区域 */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center px-4 animate-pulse">
            欢迎来到小鱼干的个人博客
          </h1>
          
          <div className="text-xl md:text-2xl text-center px-4 h-8 flex items-center">
            <span className="font-mono">
              {currentBlessing}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          {/* 滚动提示 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <p className="text-sm mt-2">向下滚动</p>
          </div>
        </div>
      </div>
    </div>
  )
}