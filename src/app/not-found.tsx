'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  const [showContent, setShowContent] = useState(false)
  
  useEffect(() => {
    setShowContent(true)
  }, [])
  
  return (
    <div className={`min-h-[calc(100vh-200px)] flex items-center justify-center px-4 transition-opacity duration-1000 ${
      showContent ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center mb-8 fade-in" style={{animationDelay: '0.1s'}}>
          <div className="relative w-[300px] h-[300px] opacity-0 jelly-bounce" style={{animationDelay: '0.2s'}}>
            <Image
              src="/images/404/sagiri.png"
              alt="404"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 opacity-0 fade-in" style={{animationDelay: '0.3s'}}>
          小笨蛋，页面跑偏啦~
        </h2>
        
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 opacity-0 fade-in" style={{animationDelay: '0.4s'}}>
          你可以选择刷新页面或者返回主页
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 fade-in" style={{animationDelay: '0.5s'}}>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-[#7caced] dark:bg-[#6ba3dc] text-white font-medium rounded-lg hover:bg-[#6ba3dc] dark:hover:bg-[#5a92cb] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            返回首页
          </Link>
          
          <Link 
            href="/about"
            className="inline-block px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
          >
            联系网站管理员
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-500 opacity-0 fade-in" style={{animationDelay: '0.6s'}}>
          <p>错误代码: 404 - 页面未找到</p>
        </div>
      </div>
    </div>
  )
}
