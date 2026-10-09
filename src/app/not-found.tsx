import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="empty-state" style={{ maxWidth: '680px', margin: '2rem auto', padding: '3rem 1.5rem' }}>
      <Image src="/images/404/sagiri.png" alt="404" width={220} height={220} style={{ objectFit: 'contain', margin: '0 auto 1rem' }} priority />
      <span className="eyebrow">ERROR / 404</span>
      <h1 className="page-title" style={{ marginTop: '0.6rem' }}>页面跑偏啦</h1>
      <p style={{ color: 'var(--muted)', margin: '0.8rem 0 1.5rem', fontSize: '0.9rem' }}>这条链接暂时没有通往任何地方，回到首页继续逛逛吧。</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.7rem', flexWrap: 'wrap' }}>
        <Link href="/" className="button-primary">返回首页 <span aria-hidden="true">↗</span></Link>
        <Link href="/posts" className="button-secondary" style={{ color: 'var(--ink)', borderColor: 'var(--line)' }}>浏览文章</Link>
      </div>
    </div>
  )
}
