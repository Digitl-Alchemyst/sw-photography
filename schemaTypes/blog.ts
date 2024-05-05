import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'hasEmbeddedVideo',
      title: 'Has Embedded Youtube Video?',
      type: 'boolean', // Adding a boolean field for isCurrentEvent
    }),
    defineField({
      name: 'videoLink',
      title: 'Video Link',
      type: 'string',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
    }),
    defineField({
      name: 'readTime',
      title: 'Article Read Time',
      type: 'string',
    }),
    defineField({
      name: 'snippet',
      title: 'Snippet',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'blogCategories',
      title: 'Blog Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'blogCategory' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
