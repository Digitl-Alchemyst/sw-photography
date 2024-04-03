type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Blog extends Base {
  author: Author;
  body: Block[];
  blogCategories: blogCategory[];
  mainImage: Image;
  slug: Slug;
  title: string;
  keywords: string;
  readTime: string;
  snippet: string;
  videoLink: string;
  hasEmbeddedVideo: boolean;
  hasEmbeddedTweet: boolean;
  comments: Comment[];
}

interface Gallery extends Base {
  author: Author;
  body: Block[];
  galleryCategories: galleryCategory[];
  mainImage: Image;
  slug: Slug;
  title: string;
  keywords: string;
  snippet: string;
  author: Author;
  publishedAt: string;
  tripDate: string;
  galleryPhotos: Image[];
}



interface Author extends Base {
  bio: Block[];
  authorImage: Image;
  name: string;
  slug: Slug;
}

interface Image {
  _type: 'image';
  asset: Reference;
  height: number;
  width: number;
  alt: string;
}

// interface Photo {
//   id: string;
//   width: number;
//   height: number;
//   url: string;
//   src: [
//     {
//       large: string;
//     },
//   ];
//   alt: string;
//   blurDataURL: string;
// }

interface Reference {
  _ref: string;
  _type: 'reference';
  alt: string;
}

interface Slug {
  _type: 'slug';
  current: string;
}

interface Block {
  _key: string;
  _type: 'block';
  children: Span[];
  markDefs: any[];
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

interface Span {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

interface blogCategory extends Base {
  description: string;
  title: string;
  order: number;
}

interface galleryCategory extends Base {
  order: number;
  description: string;
  title: string;
  featuredImage: Image;
}

interface MainImage {
  _type: 'string';
  asset: Reference;
}

interface Title {
  _type: 'string';
  current: string;
}

interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
