import { Post } from '@/types/post';
import BlogPosts from './_components/BlogPosts';
import { customFetch } from '@/util/customFetch';

export default async function Home() {
  const posts: Post[] = await customFetch('posts?_limit=10');

  return (
    <main className='min-h-screen bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
          Blog Posts
        </h1>
        <BlogPosts posts={posts} />
      </div>
    </main>
  );
}
