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
  blogCategories: Category[];
  mainImage: Image;
  slug: Slug;
  title: string;
  keywords: string;
  snippet: string;
  videoLink: string;
  hasEmbeddedVideo: string;
  hasEmbeddedTweet: boolean;
  comments: Comment[];
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
}

interface Reference {
  _ref: string;
  _type: 'reference';
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
  description: string;
  title: string;
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


// Query Payloads
export interface blogListPayload {
  title?: string;
  author: Author;
  blogCategories: Category[];
  snippet?: string;
  publistedAt?: Date;
  tripDate?: Date;
  slug?: string;
}