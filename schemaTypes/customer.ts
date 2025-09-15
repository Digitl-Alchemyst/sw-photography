import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({
      name: 'clerkId',
      title: 'Clerk User ID',
      type: 'string',
      description: 'The unique identifier from Clerk authentication',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'url',
      description: 'Profile image URL from Clerk',
    }),
    defineField({
      name: 'addresses',
      title: 'Addresses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Address Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Billing', value: 'billing' },
                  { title: 'Shipping', value: 'shipping' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'firstName',
              title: 'First Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'lastName',
              title: 'Last Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
            }),
            defineField({
              name: 'address1',
              title: 'Address Line 1',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'address2',
              title: 'Address Line 2',
              type: 'string',
            }),
            defineField({
              name: 'city',
              title: 'City',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'state',
              title: 'State/Province',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'zipCode',
              title: 'ZIP/Postal Code',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isDefault',
              title: 'Default Address',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              type: 'type',
              address1: 'address1',
              city: 'city',
              state: 'state',
            },
            prepare({ type, address1, city, state }) {
              return {
                title: `${type} - ${address1}`,
                subtitle: `${city}, ${state}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'preferences',
      title: 'Customer Preferences',
      type: 'object',
      fields: [
        defineField({
          name: 'emailMarketing',
          title: 'Email Marketing',
          type: 'boolean',
          description: 'Opt-in for marketing emails',
          initialValue: false,
        }),
        defineField({
          name: 'orderUpdates',
          title: 'Order Updates',
          type: 'boolean',
          description: 'Receive order status updates',
          initialValue: true,
        }),
        defineField({
          name: 'newProductAlerts',
          title: 'New Product Alerts',
          type: 'boolean',
          description: 'Get notified about new products',
          initialValue: false,
        }),
        defineField({
          name: 'currency',
          title: 'Preferred Currency',
          type: 'string',
          options: {
            list: [
              { title: 'USD - US Dollar', value: 'USD' },
              { title: 'EUR - Euro', value: 'EUR' },
              { title: 'GBP - British Pound', value: 'GBP' },
              { title: 'CAD - Canadian Dollar', value: 'CAD' },
            ],
          },
          initialValue: 'USD',
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Customer Statistics',
      type: 'object',
      fields: [
        defineField({
          name: 'totalOrders',
          title: 'Total Orders',
          type: 'number',
          initialValue: 0,
          readOnly: true,
        }),
        defineField({
          name: 'totalSpent',
          title: 'Total Spent',
          type: 'number',
          initialValue: 0,
          readOnly: true,
        }),
        defineField({
          name: 'lastOrderDate',
          title: 'Last Order Date',
          type: 'datetime',
          readOnly: true,
        }),
        defineField({
          name: 'averageOrderValue',
          title: 'Average Order Value',
          type: 'number',
          initialValue: 0,
          readOnly: true,
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Customer Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for customer segmentation (e.g., VIP, Wholesale, etc.)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about the customer (not visible to customer)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Account',
      type: 'boolean',
      description: 'Whether the customer account is active',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Account Created',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      profileImage: 'profileImage',
      totalOrders: 'stats.totalOrders',
      totalSpent: 'stats.totalSpent',
    },
    prepare({ firstName, lastName, email, profileImage, totalOrders, totalSpent }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${email} • ${totalOrders || 0} orders • $${(totalSpent || 0).toFixed(2)}`,
        media: profileImage,
      };
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        { field: 'firstName', direction: 'asc' },
        { field: 'lastName', direction: 'asc' },
      ],
    },
    {
      title: 'Name Z-A',
      name: 'nameDesc',
      by: [
        { field: 'firstName', direction: 'desc' },
        { field: 'lastName', direction: 'desc' },
      ],
    },
    {
      title: 'Most Recent',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Total Spent (High to Low)',
      name: 'totalSpentDesc',
      by: [{ field: 'stats.totalSpent', direction: 'desc' }],
    },
  ],
});
