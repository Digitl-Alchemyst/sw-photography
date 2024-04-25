/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/client';
import urlForImage, { urlForOpenGraphImage } from '@/u/urlForImage';
import { queryBlogMetadata, queryGalleryMetadata } from '../sanity/queries';
// import type { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
  };
};

// Define the generateMetadata function
export async function generateBlogMetadata({ params: { slug } }: Props) {
  // Fetch the post data based on the slug
  const query = queryBlogMetadata

  const post: Blog = await client.fetch(query, { slug });

  // Create metadata object with dynamic values
  const metadata = {
    type: 'BlogPosting',
    title: `${post.title} | Steven Watkins Photography`,
    description: post.snippet,
    keywords: post.keywords,
    authors: post.author,
    publisher: 'Steven Watkins Photography',

    openGraph: {
      title: `${post.title} | Steven Watkins Photography`,
      description: post.snippet,
      url: `https://sw-photography.vercel.app/blog/${slug}`,
      siteName: 'Steven Watkins Photography',
      images: {
        url: urlForOpenGraphImage(post.mainImage as any)?.url() || '',
        width: 1200,
        height: 6300,
        alt: post.mainImage.alt,
      },
      locale: 'en_US',
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Steven Watkins Photography`,
      description: post.snippet,
      siteId: '@DigitlAlchemyst',
      creator: '@DigitlAlchemyst',
      creatorId: '@DigitlAlchemyst',
      images: {
        url: urlForOpenGraphImage(post.mainImage as any)?.url() || '',
        alt: post.mainImage.alt,
      },
    },

    colorScheme: 'dark',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };

  return metadata;
}

export async function generateGalleryMetadata({ params: { slug } }: Props) {
  // Fetch the post data based on the slug
  const query = queryGalleryMetadata

  const gallery: Gallery = await client.fetch(query, { slug });

  // Create metadata object with dynamic values
  const metadata = {
    type: 'Collection',
    title: `${gallery.title} | Steven Watkins Photography`,
    description: gallery.snippet,
    keywords: gallery.keywords,
    publisher: 'UnTelevised Media',

    openGraph: {
      title: `${gallery.title} | Steven Watkins Photography`,
      description: gallery.snippet,
      url: `https://sw-photography.vercel.app/gallery/${slug}`,
      siteName: 'Steven Watkins Photography',
      images: {
        url: urlForImage(gallery.mainImage as any)?.url() || '',
        width: 1200,
        height: 6300,
        alt: gallery.mainImage.alt,
      },
      locale: 'en_US',
      type: 'article',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${gallery.title} | Steven Watkins Photography`,
      description: gallery.snippet,
      siteId: '@DigitlAlchemyst',
      creator: '@DigitlAlchemyst',
      creatorId: '@DigitlAlchemyst',
      images: {
        url: urlForImage(gallery.mainImage as any)?.url() || '',
        alt: gallery.mainImage.alt,
      },
    },

    colorScheme: 'dark',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };

  return metadata;
}
