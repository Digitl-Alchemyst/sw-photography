import ClientSideRoute from '@/c/providers/ClientSideRoute';
import sanityFetch from '@/lib/sanity/fetch';
import resolveHref from '@/lib/util/resolveHref';
import { queryBlogCategories } from '@/lib/sanity/queries';
import formatCategoryTitle from '@/l/util/formatTitleForURL';

export default async function BlogCategories() {
  const categories = await getBlogCategories();

  return (
    <nav className='flex flex-wrap gap-x-3 gap-y-2 px-6 py-4 text-sm text-slate-800 md:text-base md:font-semibold lg:text-lg'>
      {categories.map((category, index) => (
        <ClientSideRoute
          route={resolveHref('blogcategory', formatCategoryTitle(category.title)) || ''}
          key={index}
        >
          <button className='rounded-md border border-accent bg-steelflat-700/70 px-3 py-2 text-steelpolished-400'>
            {category.title}
          </button>
        </ClientSideRoute>
      ))}
    </nav>
  );
}

// Call the Sanity Fetch Function for the Blog Categories
async function getBlogCategories() {
  try {
    // Fetch Gallery Category List from Sanity
    const categories: blogCategory[] = await sanityFetch({
      query: queryBlogCategories,
      tags: ['blogCategory'],
    });

    return categories.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return []; // Return an empty array in case of an error
  }
}
