/* eslint-disable import/prefer-default-export */
// utils/fetchBlogs.ts
import { cache } from 'react';
import { sanityFetch } from '@/lib/sanity.fetch';
import { queryBlogList } from '@/l/sanity.queries';

export const fetchBlogs = cache(async () => {
  const blogs = await sanityFetch({ query: queryBlogList, tags: ['blogs'] });
  return blogs;
});
