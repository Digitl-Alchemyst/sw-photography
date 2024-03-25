/* eslint-disable react/function-component-definition */
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import BlogCard from '@/c/cards/BlogCard';
import BlogCategories from '@/components/blog/BlogCategories';
import { Alex_Brush } from 'next/font/google'; // Adjusted font import, you can add others as needed

const scriptFont = Alex_Brush({
  subsets: ['latin'],
  variable: '--my-font-family',
  weight: '400',
});

type Props = {
  params: {
    slug: string;
  };
};

// generateStaticParams();
const queryBlog = groq`
  *[_type == 'blog' && references(categories, *[_type == 'blogCategory' && slug.current == $slug]._id)] {
    ...,
    author->,
    categories[]->,
    description,
    publistedAt,
  } | order(_createdAt desc)
`;

export const revalidate = 18;

// export async function generateStaticParams() {
//   const query = groq`*[_type=='blogCategory'] { slug }`;

//   const slugs: Blog[] = await client.fetch(query);
//   const slugRoutes = slugs ? slugs.map((slug) => slug.slug.current) : [];

//   return slugRoutes.map((slug) => ({
//     slug,
//   }));
// }

export default async function BlogCategoryPage({ params: { slug } }: Props) {


  const blogs = await client.fetch(queryBlog, { slug });

 return (
   <main className='w-full bg-steeldark-600 text-steelpolished-400'>
     <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-2 bg-gradient-to-l from-steelpolished-300/10 to-steeldark-900 px-10 py-12'>
       <h1 className={`text-center text-7xl font-bold ${scriptFont.className}`}>
         -Blog-
       </h1>
       <div>
         <BlogCategories />
         <hr className='mb-8 border-accent' />
         <section className='mx-auto mt-8 grid grid-cols-1 gap-8 gap-x-10 gap-y-12 px-10 pb-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
           {/* Pass the filtered blogs array to BlogCard */}
           <BlogCard blogs={blogs} />
         </section>
       </div>
     </div>
   </main>
 );
}
