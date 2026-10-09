'use client'

import { useEffect, useState } from 'react'

function SunIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" strokeLinecap="round" /></svg>
}

function MoonIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></svg>
}

function SettingsIcon() {
  return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" /><path d="m19.4 15 .08.04a1.7 1.7 0 0 1-1.7 2.94l-.08-.05a1.7 1.7 0 0 0-2.55 1.47v.1a1.7 1.7 0 0 1-3.4 0v-.1a1.7 1.7 0 0 0-2.55-1.47l-.08.05a1.7 1.7 0 1 1-1.7-2.94l.08-.04a1.7 1.7 0 0 0-.85-3.2h-.1a1.7 1.7 0 0 1 0-3.4h.1a1.7 1.7 0 0 0 .85-3.2l-.08-.04a1.7 1.7 0 1 1 1.7-2.94l.08.05a1.7 1.7 0 0 0 2.55-1.47v-.1a1.7 1.7 0 0 1 3.4 0v.1a1.7 1.7 0 0 0 2.55 1.47l.08-.05a1.7 1.7 0 1 1 1.7 2.94l-.08.04a1.7 1.7 0 0 0 .85 3.2h.1a1.7 1.7 0 0 1 0 3.4h-.1a1.7 1.7 0 0 0-.85 3.2Z" /></svg>
}

function ArrowUpIcon() {
  return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 11 6-6 6 6M12 5v14" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const savedAutoMode = localStorage.getItem('autoMode') === 'true'
    const isNightTime = new Date().getHours() >= 18 || new Date().getHours() < 6
    const nextIsDark = savedAutoMode ? isNightTime : savedTheme === 'dark'

    setAutoMode(savedAutoMode)
    setIsDark(nextIsDark)
    document.documentElement.classList.toggle('dark', nextIsDark)

    const handleScroll = () => setShowScrollTop(window.scrollY > 360)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!autoMode) return
    const checkTime = () => {
      const isNightTime = new Date().getHours() >= 18 || new Date().getHours() < 6
      setIsDark(isNightTime)
      document.documentElement.classList.toggle('dark', isNightTime)
    }
    const interval = window.setInterval(checkTime, 60000)
    return () => window.clearInterval(interval)
  }, [autoMode])

  const toggleTheme = () => {
    const nextIsDark = !isDark
    setIsDark(nextIsDark)
    setAutoMode(false)
    document.documentElement.classList.toggle('dark', nextIsDark)
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light')
    localStorage.setItem('autoMode', 'false')
  }

  const toggleAutoMode = () => {
    const nextAutoMode = !autoMode
    setAutoMode(nextAutoMode)
    localStorage.setItem('autoMode', String(nextAutoMode))
    if (nextAutoMode) {
      const nextIsDark = new Date().getHours() >= 18 || new Date().getHours() < 6
      setIsDark(nextIsDark)
      document.documentElement.classList.toggle('dark', nextIsDark)
      localStorage.setItem('theme', nextIsDark ? 'dark' : 'light')
    }
  }

  if (!mounted) return null

  return (
    <div className="settings-dock">
      {panelOpen && (
        <div className="settings-panel" role="dialog" aria-label="外观设置">
          <p className="settings-panel-title">外观设置</p>
          <div className="settings-row">
            <span>{isDark ? '深色模式' : '浅色模式'}</span>
            <button type="button" className="settings-button" onClick={toggleTheme} aria-label="切换主题">
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
          <div className="settings-row">
            <span>跟随时间自动切换</span>
            <button type="button" className={`settings-toggle ${autoMode ? 'settings-toggle-active' : ''}`} onClick={toggleAutoMode} aria-label="自动切换主题" aria-pressed={autoMode} />
          </div>
        </div>
      )}
      <div className="settings-actions">
        {showScrollTop && (
          <button type="button" className="settings-fab" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="回到顶部">
            <ArrowUpIcon />
          </button>
        )}
        <button type="button" className="settings-fab" onClick={() => setPanelOpen((open) => !open)} aria-label={panelOpen ? '关闭外观设置' : '打开外观设置'} aria-expanded={panelOpen}>
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}
