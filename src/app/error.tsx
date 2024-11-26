'use client';
export default function Error({ error }: { error: { message: string } }) {
  return (
    <div className='text-center mt-10'>
      <h2 className='text-red-600 text-xl font-bold mb-4'>{error.message}</h2>
      <button
        onClick={() => location.reload()}
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Reload
      </button>
    </div>
  );
}
