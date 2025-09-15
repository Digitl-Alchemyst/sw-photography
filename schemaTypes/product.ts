import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
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
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Print', value: 'print' },
          { title: 'Lightroom Preset', value: 'digital_preset' },
          { title: 'Video LUT', value: 'digital_lut' },
          { title: 'Digital Bundle', value: 'digital_bundle' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price for showing discounts',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isPrimary',
              type: 'boolean',
              title: 'Primary Image',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'productCategory' } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // Print Product Specific Fields
    defineField({
      name: 'linkedPhoto',
      title: 'Linked Photo',
      type: 'reference',
      to: [{ type: 'gallery' }],
      description: 'Link to gallery photo for print products',
      hidden: ({ document }) => document?.productType !== 'print',
    }),
    defineField({
      name: 'printVariants',
      title: 'Print Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              type: 'string',
              title: 'Size',
              options: {
                list: [
                  { title: '5" x 7"', value: '5x7' },
                  { title: '8" x 10"', value: '8x10' },
                  { title: '11" x 14"', value: '11x14' },
                  { title: '16" x 20"', value: '16x20' },
                  { title: '20" x 24"', value: '20x24' },
                  { title: '24" x 36"', value: '24x36' },
                  { title: '30" x 40"', value: '30x40' },
                ],
              },
            },
            {
              name: 'material',
              type: 'string',
              title: 'Material',
              options: {
                list: [
                  { title: 'Standard Paper', value: 'standard' },
                  { title: 'Premium Paper', value: 'premium' },
                  { title: 'Canvas', value: 'canvas' },
                  { title: 'Metal Print', value: 'metal' },
                  { title: 'Acrylic', value: 'acrylic' },
                ],
              },
            },
            {
              name: 'price',
              type: 'number',
              title: 'Price',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'isAvailable',
              type: 'boolean',
              title: 'Available',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              size: 'size',
              material: 'material',
              price: 'price',
            },
            prepare({ size, material, price }) {
              return {
                title: `${size} - ${material}`,
                subtitle: `$${price}`,
              };
            },
          },
        },
      ],
      hidden: ({ document }) => document?.productType !== 'print',
    }),

    // Digital Product Specific Fields
    defineField({
      name: 'digitalFiles',
      title: 'Digital Files',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'File Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'File Description',
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.productType === 'print',
    }),
    defineField({
      name: 'previewImages',
      title: 'Preview Images',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.productType === 'print',
    }),

    // Preset Specific Fields
    defineField({
      name: 'presetDetails',
      title: 'Preset Details',
      type: 'object',
      fields: [
        {
          name: 'presetType',
          type: 'string',
          title: 'Preset Type',
          options: {
            list: [
              { title: 'Lightroom', value: 'lightroom' },
              { title: 'Photoshop', value: 'photoshop' },
              { title: 'Capture One', value: 'capture_one' },
              { title: 'Luminar', value: 'luminar' },
            ],
          },
        },
        {
          name: 'compatibleVersions',
          type: 'array',
          title: 'Compatible Versions',
          of: [{ type: 'string' }],
        },
        {
          name: 'presetCount',
          type: 'number',
          title: 'Number of Presets',
        },
        {
          name: 'styleCategory',
          type: 'string',
          title: 'Style Category',
          options: {
            list: [
              'Portrait',
              'Landscape',
              'Wedding',
              'Street Photography',
              'Film Emulation',
              'Black & White',
              'Vintage',
              'Moody',
              'Bright & Airy',
              'Cinematic',
            ],
          },
        },
      ],
      hidden: ({ document }) => document?.productType !== 'digital_preset',
    }),

    // LUT Specific Fields
    defineField({
      name: 'lutDetails',
      title: 'LUT Details',
      type: 'object',
      fields: [
        {
          name: 'lutType',
          type: 'string',
          title: 'LUT Type',
          options: {
            list: [
              { title: 'Video', value: 'video' },
              { title: 'Photo', value: 'photo' },
              { title: 'Universal', value: 'universal' },
            ],
          },
        },
        {
          name: 'format',
          type: 'string',
          title: 'Format',
          options: {
            list: [
              { title: '.cube', value: 'cube' },
              { title: '.3dl', value: '3dl' },
              { title: '.look', value: 'look' },
              { title: 'Multiple Formats', value: 'multiple' },
            ],
          },
        },
        {
          name: 'compatibleSoftware',
          type: 'array',
          title: 'Compatible Software',
          of: [{ type: 'string' }],
        },
        {
          name: 'colorSpace',
          type: 'string',
          title: 'Color Space',
        },
        {
          name: 'bitDepth',
          type: 'string',
          title: 'Bit Depth',
        },
      ],
      hidden: ({ document }) => document?.productType !== 'digital_lut',
    }),

    // Bundle Specific Fields
    defineField({
      name: 'bundleDetails',
      title: 'Bundle Details',
      type: 'object',
      fields: [
        {
          name: 'bundleType',
          type: 'string',
          title: 'Bundle Type',
          options: {
            list: [
              { title: 'Preset Pack', value: 'preset_pack' },
              { title: 'LUT Pack', value: 'lut_pack' },
              { title: 'Mixed Bundle', value: 'mixed' },
            ],
          },
        },
        {
          name: 'includedProducts',
          type: 'array',
          title: 'Included Products',
          of: [{ type: 'reference', to: { type: 'product' } }],
        },
        {
          name: 'bundleDiscount',
          type: 'number',
          title: 'Bundle Discount (%)',
          validation: (Rule) => Rule.min(0).max(100),
        },
      ],
      hidden: ({ document }) => document?.productType !== 'digital_bundle',
    }),

    // Digital Product Settings
    defineField({
      name: 'digitalSettings',
      title: 'Digital Product Settings',
      type: 'object',
      fields: [
        {
          name: 'downloadLimit',
          type: 'number',
          title: 'Download Limit',
          initialValue: 5,
        },
        {
          name: 'downloadExpiry',
          type: 'number',
          title: 'Download Expiry (hours)',
          initialValue: 168, // 7 days
        },
        {
          name: 'licenseType',
          type: 'string',
          title: 'License Type',
          options: {
            list: [
              { title: 'Personal Use', value: 'personal' },
              { title: 'Commercial Use', value: 'commercial' },
              { title: 'Extended License', value: 'extended' },
            ],
          },
          initialValue: 'personal',
        },
        {
          name: 'instructions',
          type: 'text',
          title: 'Installation Instructions',
        },
      ],
      hidden: ({ document }) => document?.productType === 'print',
    }),

    // SEO Fields
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

    // Inventory and Stock
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'object',
      fields: [
        {
          name: 'trackQuantity',
          type: 'boolean',
          title: 'Track Quantity',
          initialValue: false,
        },
        {
          name: 'quantity',
          type: 'number',
          title: 'Stock Quantity',
          hidden: ({ parent }) => !parent?.trackQuantity,
        },
        {
          name: 'allowBackorders',
          type: 'boolean',
          title: 'Allow Backorders',
          initialValue: false,
        },
      ],
    }),

    // Publishing
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      productType: 'productType',
      price: 'price',
      isActive: 'isActive',
    },
    prepare({ title, media, productType, price, isActive }) {
      const typeLabels = {
        print: '🖼️ Print',
        digital_preset: '🎨 Preset',
        digital_lut: '🎬 LUT',
        digital_bundle: '📦 Bundle',
      };

      return {
        title,
        subtitle: `${typeLabels[productType as keyof typeof typeLabels] || productType} - $${price} ${!isActive ? '(Inactive)' : ''}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Price Low-High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Recently Created',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
});
