import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import type { PostData } from '@/lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到我的博客
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          这里我分享关于技术、生活和思考的文章
        </p>
        <div className="space-x-4">
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
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">最新文章</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {allPostsData.slice(0, 4).map(({ id, date, title, excerpt }: PostData) => (
            <article key={id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
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