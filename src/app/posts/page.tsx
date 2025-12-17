import { getSortedPostsData } from '@/lib/posts'
import PostsPage from '@/components/PostsPage'

export default function Posts() {
  const initialPosts = getSortedPostsData()
  
  return <PostsPage initialPosts={initialPosts} />
}