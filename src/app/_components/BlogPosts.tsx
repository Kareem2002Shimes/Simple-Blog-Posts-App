'use client';

import Link from '@/components/link';
import { Post } from '@/types/post';
import { useEffect, useState } from 'react';

const BlogPosts = ({ posts }: { posts: Post[] }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
  }, [posts, searchTerm]);

  return (
    <>
      <div className='mb-6'>
        <input
          type='text'
          placeholder='Search by title...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300'
        />
      </div>
      <ul className='space-y-6 p-6'>
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className='border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300'
          >
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              {post.title}
            </h2>
            <p className='text-gray-600 mb-4'>
              {post.body.split(' ').slice(0, 20).join(' ')}...
            </p>
            <Link
              href={`/posts/${post.id}`}
              className='text-blue-500 hover:underline font-medium'
            >
              Read More
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPosts;
