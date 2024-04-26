import getAllUrls from '@/l/util/getAllUrls';
import { Metadata, MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseURL = process.env.BASEURL;

  const allUrls = await getAllUrls();

  const galleryURLs = allUrls
    .filter((item) => item._type === 'gallery')
    .map((gallery) => ({
      url: `${baseURL}gallery/${gallery.slug.current}`,
      lastModified: gallery._updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

  const blogURLs = allUrls
    .filter((item) => item._type === 'blog')
    .map((blog) => ({
      url: `${baseURL}blog/${blog.slug.current}`,
      lastModified: blog._updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  const galleryCategoryURLs = allUrls
    .filter((item) => item._type === 'galleryCategory')
    .map((gallery) => ({
      url: `${baseURL}gallerycategory/${gallery.slug.current}`,
      lastModified: gallery._updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }));

  const blogCategoryURLs = allUrls
    .filter((item) => item._type === 'blogCategory')
    .map((blog) => ({
      url: `${baseURL}blogcategory/${blog.slug.current}`,
      lastModified: blog._updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }));

  return [
    ...galleryURLs,
    ...blogURLs,
    ...galleryCategoryURLs,
    ...blogCategoryURLs,
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseURL}about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseURL}contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];
}
