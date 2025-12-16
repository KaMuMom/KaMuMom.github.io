import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '小鱼干的个人博客',
  description: '分享我的想法和经验',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900">
                <a href="/" className="hover:text-blue-600 transition-colors">
                  小鱼干的个人博客
                </a>
              </h1>
              <p className="mt-2 text-gray-600">分享我的想法和经验</p>
            </div>
          </header>
          
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
          
          <footer className="bg-white border-t mt-12">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <p className="text-center text-gray-500">
                © 2025 小鱼干的个人博客. 所有权利保留.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}