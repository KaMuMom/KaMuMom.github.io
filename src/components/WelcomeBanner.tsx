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

export default function WelcomeBanner() {
  const [currentBlessing, setCurrentBlessing] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [blessingIndex, setBlessingIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    const currentFullBlessing = programmerBlessings[blessingIndex]
    
    const typingTimeout = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentFullBlessing.length) {
        // 打字效果
        setCurrentBlessing(prev => prev + currentFullBlessing[currentCharIndex])
        setCurrentCharIndex(prev => prev + 1)
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

  return (
    <div className={`text-center py-16 transition-opacity duration-1000 ${
      showContent ? 'opacity-100' : 'opacity-0'
    }`}>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 fade-in">
        欢迎来到小鱼干的个人博客
      </h1>
      
      <div className="text-xl md:text-2xl h-8 flex items-center justify-center">
        <span className="text-gray-600 dark:text-gray-400 font-mono">
          {currentBlessing}
          <span className="animate-pulse">|</span>
        </span>
      </div>
    </div>
  )
}