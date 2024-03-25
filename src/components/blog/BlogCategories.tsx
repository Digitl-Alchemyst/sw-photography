import React from 'react';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import ClientSideRoute from '@/c/providers/ClientSideRoute';


const queryBlogCategory = groq`
  *[_type=='blogCategory'] {
    ...,
    title,
    order,
  } 
`;

async function BlogCategories() {
  const categories = await client.fetch(queryBlogCategory);

  const formatCategoryTitle = (title: string) => {
    // Convert to lowercase
    let formattedTitle = title.toLowerCase();

    // Remove symbols and spaces, and replace them with a dash
    formattedTitle = formattedTitle.replace(/[^a-z0-9]+/g, '-');

    return formattedTitle;
  };

  const sortedCategories = categories.sort(
    (a: { order: number }, b: { order: number }) => a.order - b.order,
  );

  return (
    <nav className='flex flex-wrap gap-x-3 gap-y-2 px-6 py-4 text-sm text-slate-800 md:text-base md:font-semibold lg:text-lg'>
      {sortedCategories.map((category: { title: string }, order: number) => (
        <ClientSideRoute
          route={`/blogcategory/${formatCategoryTitle(category.title)}`}
          key={order}
        >
          <div className='border-untele/40 rounded-md border bg-slate-700/30 px-3 py-2 text-white'>
            {category.title}
          </div>
        </ClientSideRoute>
      ))}
    </nav>
  );
}

export default BlogCategories;
