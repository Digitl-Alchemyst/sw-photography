/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity'

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
