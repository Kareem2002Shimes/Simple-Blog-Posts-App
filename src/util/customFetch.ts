export interface FetchOptions extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}

export const customFetch = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    if (options.headers) {
      options.headers['next'] = JSON.stringify({ revalidate: 3600 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(
      'Fetch error:',
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
