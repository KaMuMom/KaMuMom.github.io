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
  allTags: string[]
}

export default function PostsPage({ initialPosts, allTags }: PostsPageProps) {
  const [sortBy, setSortBy] = useState<'date' | 'alphabetical'>('date')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  
  // 按字母顺序排序文章
  const getAlphabeticallySortedPosts = (posts: PostData[]) => {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
  }
  
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
  
  // 按标签筛选文章
  const getPostsByTag = (posts: PostData[], tag: string) => {
    return posts.filter(post => 
      post.tags && post.tags.includes(tag)
    )
  }
  
  // 根据筛选条件过滤文章
  const filteredPosts = useMemo(() => {
    let posts = sortBy === 'date' ? initialPosts : getAlphabeticallySortedPosts(initialPosts)
    
    // 如果有搜索查询，优先使用搜索
    if (searchQuery.trim()) {
      posts = searchPosts(posts, searchQuery)
      return posts
    }
    
    // 如果选择了标签，按标签筛选
    if (selectedTag) {
      posts = getPostsByTag(posts, selectedTag)
    }
    
    return posts
  }, [sortBy, selectedTag, searchQuery, initialPosts])
  
  const handleSortChange = (newSortBy: 'date' | 'alphabetical') => {
    setSortBy(newSortBy)
    setSelectedTag('') // 切换排序时清除标签筛选
  }
  
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setSearchQuery('') // 切换标签时清除搜索
  }
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setSelectedTag('') // 搜索时清除标签筛选
  }

  return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>
          <p className="text-gray-600">
            共 {filteredPosts.length} 篇文章
            {searchQuery && ` (搜索: "${searchQuery}")`}
            {selectedTag && ` (标签: ${selectedTag})`}
          </p>
        </div>
  
        {/* 搜索和筛选控件 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="space-y-4">
            {/* 搜索框 */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
  
            {/* 排序和标签筛选 */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* 排序按钮 */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  排序方式
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange('date')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      sortBy === 'date'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    时间排序
                  </button>
                  <button
                    onClick={() => handleSortChange('alphabetical')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      sortBy === 'alphabetical'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    字母排序
                  </button>
                </div>
              </div>
  
              {/* 标签筛选 */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签筛选
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => handleTagChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">所有标签</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
  
        {/* 文章列表 */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(({ id, date, title, excerpt, tags }: PostData) => (
              <article key={id} className="bg-white p-6 rounded-lg shadow-sm border">
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
                  : selectedTag 
                    ? `没有找到标签为 "${selectedTag}" 的文章`
                    : '暂无文章'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    )}