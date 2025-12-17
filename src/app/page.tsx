import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import type { PostData } from '@/lib/posts'
import HeroSection from '@/components/HeroSection'
import HomePageLayout from '@/components/HomePageLayout'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <HomePageLayout>
      <HeroSection />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 fade-in" style={{animationDelay: '0.6s'}}>最新文章</h2>
            <div className="grid gap-6 md:grid-cols-2 stagger-animation">
              {allPostsData.slice(0, 4).map(({ id, date, title, excerpt }: PostData) => (
                <article key={id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow article-card jelly-bounce opacity-0">
                  <Link href={`/posts/${id}`} className="block group">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{excerpt}</p>
                    <time className="text-sm text-gray-500 dark:text-gray-500">{date}</time>
                  </Link>
                </article>
              ))}
            </div>
            {allPostsData.length > 4 && (
              <div className="text-center mt-8">
                <Link 
                  href="/posts" 
                  className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  查看所有文章 →
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </HomePageLayout>
  )
}