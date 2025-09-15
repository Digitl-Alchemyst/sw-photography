import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Gallery',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryType',
      title: 'Gallery Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photoshoot Gallery', value: 'photoshoot' },
          { title: 'Event Gallery', value: 'event' },
          { title: 'Showcase Gallery', value: 'showcase' },
        ],
        layout: 'radio',
      },
      initialValue: 'showcase',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
    }),
    defineField({
      name: 'snippet',
      title: 'Snippet',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Photographer',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),

    // Photoshoot Gallery specific fields
    defineField({
      name: 'photoshootDetails',
      title: 'Photoshoot Details',
      type: 'object',
      hidden: ({ document }) => document?.galleryType !== 'photoshoot',
      fields: [
        {
          name: 'clientName',
          type: 'string',
          title: 'Client Name',
        },
        {
          name: 'shootType',
          type: 'string',
          title: 'Shoot Type',
          options: {
            list: [
              { title: 'Portrait Session', value: 'portrait' },
              { title: 'Fashion Shoot', value: 'fashion' },
              { title: 'Commercial Shoot', value: 'commercial' },
              { title: 'Headshots', value: 'headshots' },
              { title: 'Lifestyle', value: 'lifestyle' },
              { title: 'Beauty', value: 'beauty' },
              { title: 'Editorial', value: 'editorial' },
            ],
          },
        },
        {
          name: 'stylingNotes',
          type: 'text',
          title: 'Styling Notes',
        },
        {
          name: 'makeupArtist',
          type: 'string',
          title: 'Makeup Artist',
        },
        {
          name: 'locationDetails',
          type: 'object',
          title: 'Location Details',
          fields: [
            {
              name: 'venue',
              type: 'string',
              title: 'Venue/Studio',
            },
            {
              name: 'address',
              type: 'string',
              title: 'Address',
            },
            {
              name: 'locationNotes',
              type: 'text',
              title: 'Location Notes',
            },
          ],
        },
      ],
    }),

    // Event Gallery specific fields
    defineField({
      name: 'eventDetails',
      title: 'Event Details',
      type: 'object',
      hidden: ({ document }) => document?.galleryType !== 'event',
      fields: [
        {
          name: 'eventName',
          type: 'string',
          title: 'Event Name',
        },
        {
          name: 'eventType',
          type: 'string',
          title: 'Event Type',
          options: {
            list: [
              { title: 'Wedding', value: 'wedding' },
              { title: 'Corporate Event', value: 'corporate' },
              { title: 'Birthday Party', value: 'birthday' },
              { title: 'Anniversary', value: 'anniversary' },
              { title: 'Conference', value: 'conference' },
              { title: 'Concert', value: 'concert' },
              { title: 'Festival', value: 'festival' },
              { title: 'Graduation', value: 'graduation' },
              { title: 'Other', value: 'other' },
            ],
          },
        },
        {
          name: 'venue',
          type: 'string',
          title: 'Venue',
        },
        {
          name: 'eventDate',
          type: 'datetime',
          title: 'Event Date',
        },
        {
          name: 'duration',
          type: 'string',
          title: 'Duration',
          description: 'e.g., "4 hours", "Full day", "2 days"',
        },
        {
          name: 'attendeeCount',
          type: 'number',
          title: 'Attendee Count',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'eventDescription',
          type: 'text',
          title: 'Event Description',
        },
      ],
    }),

    // Showcase Gallery specific fields
    defineField({
      name: 'showcaseDetails',
      title: 'Showcase Details',
      type: 'object',
      hidden: ({ document }) => document?.galleryType !== 'showcase',
      fields: [
        {
          name: 'artisticStatement',
          type: 'text',
          title: 'Artistic Statement',
          description: 'Your artistic vision and inspiration for this collection',
        },
        {
          name: 'exhibitionInfo',
          type: 'object',
          title: 'Exhibition Information',
          fields: [
            {
              name: 'exhibitionName',
              type: 'string',
              title: 'Exhibition Name',
            },
            {
              name: 'gallery',
              type: 'string',
              title: 'Gallery/Venue',
            },
            {
              name: 'exhibitionDate',
              type: 'datetime',
              title: 'Exhibition Date',
            },
            {
              name: 'curator',
              type: 'string',
              title: 'Curator',
            },
          ],
        },
        {
          name: 'awards',
          type: 'array',
          title: 'Awards & Recognition',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'awardName',
                  type: 'string',
                  title: 'Award Name',
                },
                {
                  name: 'organization',
                  type: 'string',
                  title: 'Organization',
                },
                {
                  name: 'year',
                  type: 'number',
                  title: 'Year',
                },
              ],
            },
          ],
        },
        {
          name: 'techniqueDetails',
          type: 'object',
          title: 'Technique Details',
          fields: [
            {
              name: 'technique',
              type: 'string',
              title: 'Primary Technique',
              options: {
                list: [
                  { title: 'Digital Photography', value: 'digital' },
                  { title: 'Film Photography', value: 'film' },
                  { title: 'Mixed Media', value: 'mixed' },
                  { title: 'HDR', value: 'hdr' },
                  { title: 'Long Exposure', value: 'long_exposure' },
                  { title: 'Macro', value: 'macro' },
                  { title: 'Aerial/Drone', value: 'aerial' },
                ],
              },
            },
            {
              name: 'postProcessing',
              type: 'text',
              title: 'Post-Processing Notes',
            },
            {
              name: 'specialEquipment',
              type: 'text',
              title: 'Special Equipment Used',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'galleryCategories',
      title: 'Gallery Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'galleryCategory' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'tripDate',
      title: 'Trip Date',
      type: 'datetime',
    }),
    defineField({
      name: 'galleryPhotos',
      title: 'Gallery Photos',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
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
              name: 'title',
              type: 'string',
              title: 'Photo Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'location',
              type: 'object',
              title: 'Location Details',
              fields: [
                {
                  name: 'venue',
                  type: 'string',
                  title: 'Venue/Location Name',
                },
                {
                  name: 'city',
                  type: 'string',
                  title: 'City',
                },
                {
                  name: 'state',
                  type: 'string',
                  title: 'State/Province',
                },
                {
                  name: 'country',
                  type: 'string',
                  title: 'Country',
                },
                {
                  name: 'coordinates',
                  type: 'geopoint',
                  title: 'GPS Coordinates',
                },
              ],
            },
            {
              name: 'dateTaken',
              type: 'datetime',
              title: 'Date Taken',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
            },
            {
              name: 'tags',
              type: 'array',
              title: 'Tags/Keywords',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags',
              },
            },
            {
              name: 'photographerInfo',
              type: 'object',
              title: 'Photographer Information',
              fields: [
                {
                  name: 'photographer',
                  type: 'reference',
                  title: 'Photographer',
                  to: { type: 'author' },
                },
                {
                  name: 'assistants',
                  type: 'array',
                  title: 'Photography Assistants',
                  of: [{ type: 'string' }],
                },
                {
                  name: 'credits',
                  type: 'text',
                  title: 'Additional Credits',
                },
              ],
            },
            {
              name: 'cameraSettings',
              type: 'object',
              title: 'Camera & Technical Details',
              fields: [
                {
                  name: 'camera',
                  type: 'string',
                  title: 'Camera Model',
                  description: 'e.g., Canon EOS R5, Nikon D850',
                },
                {
                  name: 'lens',
                  type: 'string',
                  title: 'Lens',
                  description: 'e.g., Canon RF 24-70mm f/2.8L IS USM',
                },
                {
                  name: 'focalLength',
                  type: 'string',
                  title: 'Focal Length',
                  description: 'e.g., 85mm, 24mm',
                },
                {
                  name: 'aperture',
                  type: 'string',
                  title: 'Aperture (f-stop)',
                  description: 'e.g., f/2.8, f/5.6',
                },
                {
                  name: 'shutterSpeed',
                  type: 'string',
                  title: 'Shutter Speed',
                  description: 'e.g., 1/125s, 2s',
                },
                {
                  name: 'iso',
                  type: 'string',
                  title: 'ISO',
                  description: 'e.g., ISO 100, ISO 3200',
                },
                {
                  name: 'flashUsed',
                  type: 'boolean',
                  title: 'Flash Used',
                  initialValue: false,
                },
                {
                  name: 'flashDetails',
                  type: 'string',
                  title: 'Flash Details',
                  description: 'Flash type, power, modifiers used',
                  hidden: ({ parent }) => !parent?.flashUsed,
                },
                {
                  name: 'shootingMode',
                  type: 'string',
                  title: 'Shooting Mode',
                  options: {
                    list: [
                      { title: 'Manual', value: 'manual' },
                      { title: 'Aperture Priority', value: 'aperture_priority' },
                      { title: 'Shutter Priority', value: 'shutter_priority' },
                      { title: 'Program', value: 'program' },
                      { title: 'Auto', value: 'auto' },
                    ],
                  },
                },
                {
                  name: 'meteringMode',
                  type: 'string',
                  title: 'Metering Mode',
                  options: {
                    list: [
                      { title: 'Matrix/Evaluative', value: 'matrix' },
                      { title: 'Center-weighted', value: 'center_weighted' },
                      { title: 'Spot', value: 'spot' },
                    ],
                  },
                },
                {
                  name: 'whiteBalance',
                  type: 'string',
                  title: 'White Balance',
                  options: {
                    list: [
                      { title: 'Auto', value: 'auto' },
                      { title: 'Daylight', value: 'daylight' },
                      { title: 'Cloudy', value: 'cloudy' },
                      { title: 'Tungsten', value: 'tungsten' },
                      { title: 'Fluorescent', value: 'fluorescent' },
                      { title: 'Custom', value: 'custom' },
                    ],
                  },
                },
                {
                  name: 'fileFormat',
                  type: 'string',
                  title: 'File Format',
                  options: {
                    list: [
                      { title: 'RAW', value: 'raw' },
                      { title: 'JPEG', value: 'jpeg' },
                      { title: 'RAW + JPEG', value: 'raw_jpeg' },
                    ],
                  },
                },
              ],
            },
            {
              name: 'printOptions',
              type: 'object',
              title: 'Print Shop Options',
              fields: [
                {
                  name: 'available',
                  type: 'boolean',
                  title: 'Available for Print',
                  initialValue: true,
                },
                {
                  name: 'featured',
                  type: 'boolean',
                  title: 'Featured Print',
                  description: 'Highlight this photo in print collections',
                  initialValue: false,
                },
                {
                  name: 'limitedEdition',
                  type: 'boolean',
                  title: 'Limited Edition',
                  initialValue: false,
                },
                {
                  name: 'editionSize',
                  type: 'number',
                  title: 'Edition Size',
                  description: 'Total number of prints available',
                  hidden: ({ parent }) => !parent?.limitedEdition,
                  validation: (Rule) => Rule.min(1),
                },
                {
                  name: 'printsSold',
                  type: 'number',
                  title: 'Prints Sold',
                  description: 'Number of prints already sold',
                  hidden: ({ parent }) => !parent?.limitedEdition,
                  initialValue: 0,
                  validation: (Rule) => Rule.min(0),
                },
                {
                  name: 'pricingTiers',
                  type: 'array',
                  title: 'Pricing Tiers',
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
                              { title: '5x7 inches', value: '5x7' },
                              { title: '8x10 inches', value: '8x10' },
                              { title: '11x14 inches', value: '11x14' },
                              { title: '16x20 inches', value: '16x20' },
                              { title: '20x24 inches', value: '20x24' },
                              { title: '24x36 inches', value: '24x36' },
                              { title: '30x40 inches', value: '30x40' },
                            ],
                          },
                        },
                        {
                          name: 'material',
                          type: 'string',
                          title: 'Material',
                          options: {
                            list: [
                              { title: 'Standard Paper', value: 'standard_paper' },
                              { title: 'Premium Paper', value: 'premium_paper' },
                              { title: 'Canvas', value: 'canvas' },
                              { title: 'Metal', value: 'metal' },
                              { title: 'Acrylic', value: 'acrylic' },
                              { title: 'Fine Art Paper', value: 'fine_art_paper' },
                            ],
                          },
                        },
                        {
                          name: 'price',
                          type: 'number',
                          title: 'Price (USD)',
                          validation: (Rule) => Rule.min(0).required(),
                        },
                        {
                          name: 'available',
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
                },
                {
                  name: 'printDescription',
                  type: 'text',
                  title: 'Print Description',
                  description: 'Special notes about this print, quality, or finishing',
                },
                {
                  name: 'printId',
                  type: 'string',
                  title: 'Print Shop ID',
                  description: 'Unique identifier for print shop integration',
                },
                {
                  name: 'printfulId',
                  type: 'string',
                  title: 'Printful Product ID',
                  description: 'Printful integration ID',
                },
                {
                  name: 'printifyId',
                  type: 'string',
                  title: 'Printify Product ID',
                  description: 'Printify integration ID',
                },
                {
                  name: 'shippingNotes',
                  type: 'text',
                  title: 'Shipping Notes',
                  description: 'Special shipping instructions or timeframes',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'layoutSettings',
      title: 'Layout Settings',
      type: 'object',
      fields: [
        {
          name: 'displayStyle',
          type: 'string',
          title: 'Display Style',
          options: {
            list: [
              { title: 'Grid Layout', value: 'grid' },
              { title: 'Masonry Layout', value: 'masonry' },
              { title: 'Timeline Layout', value: 'timeline' },
              { title: 'Featured Layout', value: 'featured' },
            ],
          },
          initialValue: 'masonry',
        },
        {
          name: 'photosPerRow',
          type: 'number',
          title: 'Photos Per Row (Desktop)',
          options: {
            list: [
              { title: '2 Photos', value: 2 },
              { title: '3 Photos', value: 3 },
              { title: '4 Photos', value: 4 },
              { title: '5 Photos', value: 5 },
            ],
          },
          initialValue: 3,
        },
        {
          name: 'showMetadata',
          type: 'boolean',
          title: 'Show Photo Metadata on Hover',
          initialValue: true,
        },
        {
          name: 'enableDownloads',
          type: 'boolean',
          title: 'Enable Photo Downloads',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Custom title for search engines (leave empty to use gallery title)',
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description for search engines and social media',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'socialImage',
          type: 'image',
          title: 'Social Media Image',
          description: 'Custom image for social media sharing (leave empty to use main image)',
          options: {
            hotspot: true,
          },
        },
      ],
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
      galleryType: 'galleryType',
      photoCount: 'galleryPhotos',
    },
    prepare(selection) {
      const { author, galleryType, photoCount } = selection;
      const typeLabels = {
        photoshoot: 'Photoshoot',
        event: 'Event',
        showcase: 'Showcase',
      };
      const typeLabel = typeLabels[galleryType] || 'Gallery';
      const count = photoCount ? photoCount.length : 0;

      return {
        ...selection,
        subtitle: `${typeLabel} • ${count} photos${author ? ` • by ${author}` : ''}`,
      };
    },
  },
});
