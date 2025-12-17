'use client'

import { useState, useEffect, useMemo } from 'react'
import type { PostData } from '@/lib/posts'

interface PostsResponse {
  posts: PostData[]
  tags: string[]
  count: number
}

interface PostsPageProps {
  initialPosts: PostData[]
}

export default function PostsPage({ initialPosts }: PostsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  
  // 搜索文章（按标题或标签）
  const searchPosts = (posts: PostData[], query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowercaseQuery)
      const tagMatch = post.tags && post.tags.some(tag => 
        tag.toLowerCase().includes(lowercaseQuery)
      )
      return titleMatch || tagMatch
    })
  }
  
  // 根据搜索条件过滤文章
  const filteredPosts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchPosts(initialPosts, searchQuery)
    }
    return initialPosts
  }, [searchQuery, initialPosts])
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  return (

      <div className="space-y-8">

        <div className="text-center fade-in">

          <h1 className="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>

          <p className="text-gray-600">

            共 {filteredPosts.length} 篇文章

            {searchQuery && ` (搜索: "${searchQuery}")`}

          </p>

        </div>

  

        {/* 搜索控件 */}

        <div className="bg-white p-6 rounded-lg shadow-sm border fade-in-non-linear" style={{animationDelay: '0.2s'}}>

          <div>

            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">

              搜索文章

            </label>

            <input

              type="text"

              id="search"

              value={searchQuery}

              onChange={(e) => handleSearchChange(e.target.value)}

              placeholder="搜索文章标题或标签..."

              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"

            />

          </div>

        </div>

  

        {/* 文章列表 */}

        <div className="space-y-6 stagger-animation">

          {filteredPosts.length > 0 ? (

            filteredPosts.map(({ id, date, title, excerpt, tags }: PostData, index) => (

              <article key={id} className="bg-white p-6 rounded-lg shadow-sm border article-card jelly-bounce opacity-0" style={{animationDelay: `${0.4 + index * 0.1}s`}}>

                <a href={`/posts/${id}`} className="block group">

                  <div className="flex justify-between items-start mb-3">

                    <time className="text-sm text-gray-500">{date}</time>

                    {tags && tags.length > 0 && (

                      <div className="flex gap-2 flex-wrap">

                        {tags.map((tag) => (

                          <span 

                            key={tag} 

                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"

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

                </a>

              </article>

            ))

          ) : (

            <div className="text-center py-12">

              <p className="text-gray-500 text-lg">

                {searchQuery 

                  ? `没有找到包含 "${searchQuery}" 的文章`

                  : '暂无文章'

                }

              </p>

            </div>

          )}

        </div>

      </div>

    )}