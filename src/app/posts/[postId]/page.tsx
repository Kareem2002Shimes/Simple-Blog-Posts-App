import Link from '@/components/link';
import { Comment, Post } from '@/types/post';
import { customFetch } from '@/util/customFetch';

export async function generateStaticParams() {
  const posts: Post[] = await customFetch('posts?_limit=10');

  return posts.map((post) => ({
    postId: String(post.id),
  }));
}

const PostDetails = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  const [post, comments] = await Promise.all([
    customFetch<Post>(`posts/${postId}`),
    customFetch<Comment[]>(`comments?postId=${postId}`),
  ]);

  return (
    <main className='min-h-screen bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <article className='bg-white rounded-lg shadow-md p-6'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>
            {post.title}
          </h1>
          <p className='text-gray-700 mb-6'>{post.body}</p>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Comments
          </h2>
          <ul className='space-y-4'>
            {comments.map((comment) => (
              <li key={comment.id} className='border-b pb-4'>
                <p className='text-gray-800 font-semibold'>
                  {comment.name} ({comment.email})
                </p>
                <p className='text-gray-600'>{comment.body}</p>
              </li>
            ))}
          </ul>
        </article>
        <div className='mt-8'>
          <Link
            href='/'
            className='inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors'
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PostDetails;
