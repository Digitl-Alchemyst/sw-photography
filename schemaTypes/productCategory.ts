import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
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
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Leave empty for top-level categories',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'productTypes',
      title: 'Applicable Product Types',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Print', value: 'print' },
              { title: 'Lightroom Preset', value: 'digital_preset' },
              { title: 'Video LUT', value: 'digital_lut' },
              { title: 'Digital Bundle', value: 'digital_bundle' },
            ],
          },
        },
      ],
      description: 'Which product types can use this category',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      parentName: 'parentCategory.name',
      isActive: 'isActive',
    },
    prepare({ title, media, parentName, isActive }) {
      return {
        title,
        subtitle: `${parentName ? `${parentName} > ` : ''}${!isActive ? '(Inactive)' : ''}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
