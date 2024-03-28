/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity';

// Get list of all blog post only returning the info needed to build the blog cards.
export const queryBlogList = groq`
  *[_type=='blog'] {
    mainImage,
    author->,
    blogCategories[]->,
    _createdAt,
    snippet,
    title,
    slug,
    tripDate,    
  } 
  | order(_createdAt desc)
`;

export const queryBlogListByCategory = groq`
  *[_type == 'blog' && references(categories, *[_type == 'blogCategory' && slug.current == $slug]._id)] {
    mainImage,
    author->,
    blogCategories[]->,
    _createdAt,
    snippet,
    title,
    slug,
    tripDate,
  } | order(_createdAt desc)
`;

export const queryBlogPostBySlug = groq`
    *[_type == "blog" && slug.current == $slug][0] {
      ...,
      author->,
      blogCategories[]->,
    }`;

export const queryBlogCategories = groq`
  *[_type=='blogCategory'] {
    ...,
    title,
    order,
  } 
`;

export const queryGalleryCategories = groq`
  *[_type=='galleryCategory'] {
    ...,
    title,
    order,
    featuredImage,
    slug
  } 
`;

export const queryGalleryListByCategory = groq`
  *[_type == 'gallery' && references(categories, *[_type == 'galleryCategory' && slug.current == $slug]._id)] {
    mainImage,
    author->,
    galleryCategories[]->,
    _createdAt,
    snippet,
    title,
    slug,
    tripDate,
  } | order(_createdAt desc)
`;

export const queryGalleryBySlug = groq`
  *[_type == 'gallery' && references(categories, *[_type == 'galleryCategory' && slug.current == $slug]._id)] {
    galleryPhotos[]{
      image{
        asset->{url, _id},
        alt
      }
    }
  }
`;
