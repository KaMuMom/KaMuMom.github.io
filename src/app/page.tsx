import Link from 'next/link'
import WelcomeBanner from '@/components/WelcomeBanner'
import { getAllTags, getSortedPostsData } from '@/lib/posts'
import type { PostData } from '@/lib/posts'

function PostCard({ post, index }: { post: PostData; index: number }) {
  return (
    <article className={`post-card reveal-up ${index === 0 ? 'post-card-featured' : ''}`}>
      <Link href={`/posts/${post.id}`} className="block h-full">
        <div className="post-card-top">
          <span className="post-index">{String(index + 1).padStart(2, '0')}</span>
          <time className="post-date" dateTime={post.date}>{post.date}</time>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-meta">
          <div className="tag-row">
            {post.tags?.slice(0, 3).map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
          </div>
          <span className="read-more" aria-hidden="true">阅读 ↗</span>
        </div>
      </Link>
    </article>
  )
}

export default function Home() {
  const posts = getSortedPostsData()
  const tags = getAllTags()

  return (
    <div className="home-page">
      <WelcomeBanner
        postCount={posts.length}
        tagCount={tags.length}
        latestDate={posts[0]?.date}
      />

      <section aria-labelledby="latest-posts-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM THE NOTEBOOK</span>
            <h2 id="latest-posts-title">最新文章</h2>
          </div>
          <Link href="/posts" className="section-link">查看全部文章 <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="home-content-grid">
          <div className="post-grid">
            {posts.slice(0, 4).map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
          </div>

          <aside className="info-stack" aria-label="博客信息">
            <div className="info-card reveal-up reveal-delay-2">
              <span className="eyebrow">ABOUT THIS SPACE</span>
              <h3>一边做，一边记录。</h3>
              <p>技术笔记、生活观察和偶尔的游戏与菜谱。愿每一次记录，都能让下一次出发更轻一点。</p>
              <Link href="/about" className="section-link" style={{ marginTop: '1rem' }}>关于小鱼干 <span aria-hidden="true">→</span></Link>
            </div>
            <div className="info-card reveal-up reveal-delay-3">
              <span className="eyebrow">TOPICS</span>
              <h3>最近在聊什么</h3>
              <div className="topic-list">
                {tags.slice(0, 10).map((tag) => <Link key={tag} href={`/posts?tag=${encodeURIComponent(tag)}`} className="topic-link">{tag}</Link>)}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
