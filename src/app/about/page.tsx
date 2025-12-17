import Link from 'next/link'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 fade-in">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
        >
          ← 返回首页
        </Link>
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 fade-in-non-linear" style={{animationDelay: '0.2s'}}>关于我</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300 fade-in" style={{animationDelay: '0.4s'}}>
          <p>
            你好！欢迎来到我的个人博客。我是一名热爱技术和分享的开发者。
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">我的背景</h2>
          <p>
            我拥有多年的软件开发经验，专注于前端开发和用户体验设计。我相信技术应该服务于人，让生活变得更美好。
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 fade-in-non-linear" style={{animationDelay: '0.6s'}}>我的兴趣</h2>
          <ul className="list-disc pl-6 space-y-2 fade-in" style={{animationDelay: '0.7s'}}>
            <li>Web开发和现代前端框架</li>
            <li>用户体验设计和界面优化</li>
            <li>开源项目和技术社区</li>
            <li>人工智能和机器学习</li>
            <li>摄影和旅行</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 fade-in-non-linear" style={{animationDelay: '0.8s'}}>联系我</h2>
          <p>
            如果你对我的文章感兴趣，或者想要交流技术话题，欢迎通过以下方式联系我：
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-4 fade-in border border-gray-200 dark:border-gray-700" style={{animationDelay: '0.9s'}}>
            <ul className="space-y-2">
              <li><strong>Email:</strong> ldf.fish@foxmail.com</li>
              <li><strong>GitHub:</strong> github.com/KaMuMom</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 fade-in-non-linear" style={{animationDelay: '1.0s'}}>这个博客</h2>
          <p>
            这个博客是我分享技术心得、生活感悟和学习笔记的地方。我希望通过写作来整理自己的思路，同时也希望能够帮助到其他开发者。
          </p>
          <p>
            博客使用 Next.js 和 Tailwind CSS 构建，代码托管在 GitHub 上，通过 GitHub Pages 部署。
          </p>
        </div>
      </article>
    </div>
  )
}