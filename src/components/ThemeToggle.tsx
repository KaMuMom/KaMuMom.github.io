'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const savedTheme = localStorage.getItem('theme')
    const savedAutoMode = localStorage.getItem('autoMode') === 'true'
    const hour = new Date().getHours()
    const isNightTime = hour >= 18 || hour < 6
    
    setAutoMode(savedAutoMode)
    
    if (savedAutoMode) {
      setIsDark(isNightTime)
      document.documentElement.classList.toggle('dark', isNightTime)
    } else if (savedTheme) {
      const isDarkMode = savedTheme === 'dark'
      setIsDark(isDarkMode)
      document.documentElement.classList.toggle('dark', isDarkMode)
    } else if (isNightTime) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!autoMode) return
    
    const checkTime = () => {
      const hour = new Date().getHours()
      const isNightTime = hour >= 18 || hour < 6
      if (isNightTime !== isDark) {
        setIsDark(isNightTime)
        document.documentElement.classList.toggle('dark', isNightTime)
      }
    }
    
    const interval = setInterval(checkTime, 60000)
    return () => clearInterval(interval)
  }, [autoMode, isDark])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    setAutoMode(false)
    document.documentElement.classList.toggle('dark', newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    localStorage.setItem('autoMode', 'false')
  }

  const toggleAutoMode = () => {
    const newAutoMode = !autoMode
    setAutoMode(newAutoMode)
    localStorage.setItem('autoMode', String(newAutoMode))
    
    if (newAutoMode) {
      const hour = new Date().getHours()
      const isNightTime = hour >= 18 || hour < 6
      setIsDark(isNightTime)
      document.documentElement.classList.toggle('dark', isNightTime)
      localStorage.setItem('theme', isNightTime ? 'dark' : 'light')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {isOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">主题模式</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="切换主题"
                >
                  {isDark ? (
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-700 dark:text-gray-300">自动切换</span>
                <button
                  onClick={toggleAutoMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label="自动切换主题"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700"
            aria-label="设置"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-2"
              aria-label="回到顶部"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  )
}
