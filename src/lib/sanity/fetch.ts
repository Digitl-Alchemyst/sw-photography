import 'server-only';

import type { QueryParams } from '@sanity/client';
import { draftMode } from 'next/headers';
import { client } from './client';
import { readToken } from '@/l/sanity/tokens';

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export default async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  // console.log("🚀 fetch ~ params:", params)
  // console.log("🚀 fetch ~ query:", query)
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !readToken) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }

  return client.fetch<QueryResponse>(query, params, {
    cache: 'no-store',
    
    ...(isDraftMode && {
      cache: 'no-store',
      token: readToken,
      perspective: 'previewDrafts',
    }),
    next: {
      // revalidate: 30,
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },

  });
}

