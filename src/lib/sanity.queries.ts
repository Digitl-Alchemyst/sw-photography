/* eslint-disable import/prefer-default-export */
import { groq } from 'next-sanity'

// Get list of all blog post only returning the info needed to build the blog cards.
export const queryBlogList = groq`
  *[_type=='blog'] {
    mainImage,
    author->,
    blogCategories[]->,
    publistedAt,
    snippet,
    title,
    slug,
    tripDate,    
  } 
  | order(_createdAt desc)
`;


