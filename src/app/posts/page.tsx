import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import type { PostData } from '@/lib/posts'

export default function Posts() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>
        <p className="text-gray-600">共 {allPostsData.length} 篇文章</p>
      </div>

      <div className="space-y-6">
        {allPostsData.map(({ id, date, title, excerpt, tags }: PostData) => (
          <article key={id} className="bg-white p-6 rounded-lg shadow-sm border">
            <Link href={`/posts/${id}`} className="block group">
              <div className="flex justify-between items-start mb-3">
                <time className="text-sm text-gray-500">{date}</time>
                {tags && tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{excerpt}</p>
              <span className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium">
                阅读更多 →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}