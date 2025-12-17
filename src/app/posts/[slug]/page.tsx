import Link from 'next/link'
import { getPostData, getAllPostIds } from '@/lib/posts'
import type { PostData } from '@/lib/posts'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.id,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/posts" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 fade-in"
        >
          ← 返回文章列表
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 fade-in-non-linear" style={{animationDelay: '0.2s'}}>
          {postData.title}
        </h1>
        
        <div className="flex items-center justify-between mb-6 fade-in" style={{animationDelay: '0.3s'}}>
          <time className="text-gray-500 dark:text-gray-500">{postData.date}</time>
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {postData.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div 
        className="prose prose-lg dark:prose-invert max-w-none fade-in-non-linear"
        style={{animationDelay: '0.5s'}}
        dangerouslySetInnerHTML={{ __html: postData.content || '' }}
      />

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 fade-in" style={{animationDelay: '0.7s'}}>
        <Link 
          href="/posts" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          ← 返回文章列表
        </Link>
      </div>
    </article>
  )
}