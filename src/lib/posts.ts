import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  date: string
  excerpt: string
  content?: string
  tags?: string[]
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 按标题字母顺序排序文章
export function getAlphabeticallySortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
    }
  })

  return allPostsData.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
}

// 获取所有标签
export function getAllTags(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allTags = new Set<string>()
  
  fileNames.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    const tags = matterResult.data.tags || []
    tags.forEach((tag: string) => allTags.add(tag))
  })
  
  return Array.from(allTags).sort()
}

// 按标签筛选文章
export function getPostsByTag(tag: string): PostData[] {
  const allPostsData = getSortedPostsData()
  return allPostsData.filter(post => 
    post.tags && post.tags.includes(tag)
  )
}

// 搜索文章（按标题或标签）
export function searchPosts(query: string): PostData[] {
  const allPostsData = getSortedPostsData()
  const lowercaseQuery = query.toLowerCase()
  
  return allPostsData.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(lowercaseQuery)
    const tagMatch = post.tags && post.tags.some(tag => 
      tag.toLowerCase().includes(lowercaseQuery)
    )
    return titleMatch || tagMatch
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    content: contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt || '',
    tags: matterResult.data.tags || [],
  }
}