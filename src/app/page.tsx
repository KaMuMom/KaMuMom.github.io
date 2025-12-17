import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import type { PostData } from '@/lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="space-y-8">
      <section className="text-center py-12 fade-in">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到我的博客
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          这里我分享关于技术、生活和思考的文章
        </p>
        <div className="space-x-4 fade-in-non-linear" style={{animationDelay: '0.2s'}}>
          <Link 
            href="/posts" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            阅读文章
          </Link>
          <Link 
            href="/about" 
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            关于我
          </Link>
        </div>
        <div className="flex justify-center space-x-4 mt-6 fade-in-non-linear" style={{animationDelay: '0.4s'}}>
          <a 
            href="https://space.bilibili.com/471160829" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
            title="B站"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.789 1.894v7.52c.02.765.283 1.395.789 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.128.789-1.893v-7.52c-.02-.765-.283-1.396-.789-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96v-1.173c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96v-1.173c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/KaMuMom" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors"
            title="GitHub"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://steamcommunity.com/id/3441942448/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-black transition-colors overflow-hidden"
            title="Steam"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
            </svg>
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 fade-in" style={{animationDelay: '0.6s'}}>最新文章</h2>
        <div className="grid gap-6 md:grid-cols-2 stagger-animation">
          {allPostsData.slice(0, 4).map(({ id, date, title, excerpt }: PostData) => (
            <article key={id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow article-card jelly-bounce opacity-0">
              <Link href={`/posts/${id}`} className="block group">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
                <time className="text-sm text-gray-500">{date}</time>
              </Link>
            </article>
          ))}
        </div>
        {allPostsData.length > 4 && (
          <div className="text-center mt-8">
            <Link 
              href="/posts" 
              className="inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              查看所有文章 →
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}