import Link from 'next/link'
import { getAllPostIds, getPostData } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPostIds().map((path) => ({ slug: path.params.id }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <div className="page-stack" style={{ gap: '0' }}>
      <div className="reveal-up">
        <Link href="/posts" className="back-link"><span aria-hidden="true">←</span> 返回文章列表</Link>
      </div>

      <article className="article-shell reveal-up reveal-delay-1">
        <header className="article-header">
          <span className="eyebrow">ARTICLE / {postData.id}</span>
          <h1 className="article-title">{postData.title}</h1>
          <p className="article-excerpt">{postData.excerpt}</p>
          <div className="article-meta">
            <time className="article-date" dateTime={postData.date}>发布于 {postData.date}</time>
            {postData.tags && postData.tags.length > 0 && (
              <div className="tag-row">
                {postData.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
              </div>
            )}
          </div>
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: postData.content || '' }}
        />

        <footer className="article-footer">
          <Link href="/posts" className="back-link"><span aria-hidden="true">←</span> 返回文章列表</Link>
          <Link href="/about" className="back-link">了解作者 <span aria-hidden="true">↗</span></Link>
        </footer>
      </article>
    </div>
  )
}
