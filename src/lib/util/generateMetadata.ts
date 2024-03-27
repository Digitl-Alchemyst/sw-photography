/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity';
import { client } from '@/l/sanity.client';
import urlForImage from '@/u/urlForImage';
// import type { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
  };
};

// Define the generateMetadata function
export async function generateMetadata({ params: {slug} }: Props ) {
  // Fetch the post data based on the slug
  const query = groq`
    *[_type == "blog" && slug.current == $slug][0] {
      title,
      mainImage,
      keywords,
      snippet,
      author->,
      // Add more fields as needed for metadata
    }`;

  const post: Blog = await client.fetch(query, { slug });

  // Create metadata object with dynamic values
  const metadata = {
    // type: 'article',
    title: `${post.title} | UnTelevised Media`,
    description: post.snippet,
    keywords: post.keywords,
    authors: post.author,
    publisher: 'UnTelevised Media',

    openGraph: {
      title: `${post.title} | UnTelevised Media`,
      description: post.snippet,
      url: `https://untelevised.media/post/${slug}`,
      //   siteName: 'UnTelevised Media',
      images: {
        url: urlForImage(post.mainImage as any)?.url() || '',
        //   width: 800,
        //   height: 600,
        // alt: post.mainImage.alt,
      },
      //   locale: 'en_US',
      //   type: 'article',
    },

    twitter: {
      //   card: 'app',
      title: `${post.title} | UnTelevised Media`,
      description: post.snippet,
      //   siteId: '1467726470533754880',
      creator: '@UnTelevisedLive',
      //   creatorId: '1467726470533754880',
      images: {
        url: urlForImage(post.mainImage as any)?.url() || '',
        // alt: post.mainImage.alt,
      },
    },

    // colorScheme: 'dark',
    // referrer: 'origin-when-cross-origin',
    // formatDetection: {
    //   email: false,
    //   address: false,
    //   telephone: false,
    // },
  };

  return metadata;
}
