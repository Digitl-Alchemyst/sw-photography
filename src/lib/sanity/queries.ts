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

// Get list of all blog post by a specific category only returning the info needed to build the blog cards.
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

// Get a specific blog post by its slug
export const queryBlogPostBySlug = groq`
    *[_type == "blog" && slug.current == $slug][0] {
      ...,
      author->,
      blogCategories[]->,
    }`;

// Get a list of all blog categories
export const queryBlogCategories = groq`
  *[_type=='blogCategory'] {
    ...,
    title,
    order,
  } 
`;

// Get a list of all the Gallery Categories
export const queryGalleryCategories = groq`
  *[_type=='galleryCategory'] {
    ...,
    title,
    order,
    featuredImage,
    slug
  } 
`;

// Get a list of all Galleries in a specific Category
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

// Get a specific Gallery by its slug
export const queryGalleryBySlug = groq`
    *[_type == "gallery" && slug.current == $slug][0] {
      ...,
      author->,
    }`;

export const queryGalleryMetadata = groq`
    *[_type == "gallery" && slug.current == $slug][0] {
      mainImage,
      author->,
      snippet,
      title,
      slug,
      keywords,
    }`;
export const queryBlogMetadata = groq`
    *[_type == "blog" && slug.current == $slug][0] {
      title,
      mainImage,
      keywords,
      snippet,
      author->,
      readTime,
    }`;

export const queryPhotographers = groq`
  *[_type=='author'] {
    ...,
  }
`;
