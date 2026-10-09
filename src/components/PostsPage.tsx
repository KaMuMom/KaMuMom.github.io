'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { PostData } from '@/lib/posts'

interface PostsPageProps {
  initialPosts: PostData[]
}

function SearchIcon() {
  return (
    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" strokeLinecap="round" />
    </svg>
  )
}

export default function PostsPage({ initialPosts }: PostsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    const tagFromUrl = new URLSearchParams(window.location.search).get('tag')
    if (tagFromUrl) setSelectedTag(tagFromUrl)
  }, [])

  const tags = useMemo(() => {
    const allTags = new Set<string>()
    initialPosts.forEach((post) => post.tags?.forEach((tag) => allTags.add(tag)))
    return Array.from(allTags).sort((a, b) => a.localeCompare(b, 'zh-CN'))
  }, [initialPosts])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return initialPosts.filter((post) => {
      const matchesQuery = !query || post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
      return matchesQuery && matchesTag
    })
  }, [initialPosts, searchQuery, selectedTag])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedTag('')
  }

  return (
    <div className="page-stack">
      <section className="page-intro reveal-up" aria-labelledby="posts-title">
        <div className="page-intro-copy">
          <span className="eyebrow">THE NOTEBOOK</span>
          <h1 id="posts-title" className="page-title">所有文章</h1>
          <p className="page-intro-description">把零散的想法整理成可以再次翻阅的页面。按关键词或主题，找到你想读的那一篇。</p>
        </div>
        <div className="post-count"><strong>{initialPosts.length}</strong><br />篇记录</div>
      </section>

      <section className="search-panel reveal-up reveal-delay-1" aria-label="筛选文章">
        <div className="search-row">
          <div className="search-field">
            <SearchIcon />
            <label className="sr-only" htmlFor="post-search">搜索文章标题、摘要或标签</label>
            <input
              id="post-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="搜索文章标题、摘要或标签…"
              className="search-input"
            />
            {searchQuery && (
              <button type="button" className="clear-search" onClick={() => setSearchQuery('')} aria-label="清除搜索">×</button>
            )}
          </div>
          {(searchQuery || selectedTag) && (
            <button type="button" className="button-secondary" onClick={resetFilters} style={{ color: 'var(--ink)', borderColor: 'var(--line)' }}>重置</button>
          )}
        </div>
        <p className="filter-label">按主题筛选</p>
        <div className="filter-list">
          <button type="button" className={`filter-button ${!selectedTag ? 'filter-button-active' : ''}`} onClick={() => setSelectedTag('')}>全部</button>
          {tags.map((tag) => (
            <button key={tag} type="button" className={`filter-button ${selectedTag === tag ? 'filter-button-active' : ''}`} onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}>{tag}</button>
          ))}
        </div>
      </section>

      <section aria-live="polite">
        <p className="results-label">找到 <strong>{filteredPosts.length}</strong> 篇文章{searchQuery && <>，匹配 “{searchQuery}”</>}{selectedTag && <>，主题为 “{selectedTag}”</>}</p>
        {filteredPosts.length > 0 ? (
          <div className="post-list">
            {filteredPosts.map((post, index) => (
              <article key={post.id} className="post-list-item reveal-up" style={{ animationDelay: `${Math.min(index * 45, 400)}ms` }}>
                <span className="post-list-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <Link href={`/posts/${post.id}`}><h2 className="post-list-title">{post.title}</h2></Link>
                  <p className="post-list-excerpt">{post.excerpt}</p>
                </div>
                <div className="post-list-side">
                  <time className="post-date" dateTime={post.date}>{post.date}</time>
                  <div className="tag-row">
                    {post.tags?.slice(0, 2).map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-mark">?</div>
            <p>{searchQuery || selectedTag ? '没有找到匹配的文章，换个关键词试试吧。' : '暂无文章。'}</p>
          </div>
        )}
      </section>
    </div>
  )
}
