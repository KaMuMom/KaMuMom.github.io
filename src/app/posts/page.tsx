import { getSortedPostsData, getAllTags } from '@/lib/posts'
import PostsPage from '@/components/PostsPage'

export default function Posts() {
  const initialPosts = getSortedPostsData()
  const allTags = getAllTags()
  
  return <PostsPage initialPosts={initialPosts} allTags={allTags} />
}