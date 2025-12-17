'use client'

import { useEffect } from 'react'

export default function HeaderScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('main-header')
      const scrollY = window.scrollY
      
      if (header) {
        if (scrollY > 50) {
          header.classList.remove('opacity-0', '-translate-y-full')
          header.classList.add('opacity-100', 'translate-y-0')
        } else {
          header.classList.add('opacity-0', '-translate-y-full')
          header.classList.remove('opacity-100', 'translate-y-0')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}