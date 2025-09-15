import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Refunded', value: 'refunded' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      description: 'Reference to the customer who placed this order',
    }),
    defineField({
      name: 'guestCustomer',
      title: 'Guest Customer Information',
      type: 'object',
      description: 'Customer information for guest checkouts (when no customer reference)',
      fields: [
        {
          name: 'email',
          type: 'string',
          title: 'Email',
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: 'firstName',
          type: 'string',
          title: 'First Name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'lastName',
          type: 'string',
          title: 'Last Name',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone',
        },
      ],
      hidden: ({ document }) => !!document?.customer,
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              type: 'reference',
              title: 'Product',
              to: [{ type: 'product' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'productName',
              type: 'string',
              title: 'Product Name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'productType',
              type: 'string',
              title: 'Product Type',
              options: {
                list: [
                  { title: 'Print', value: 'print' },
                  { title: 'Lightroom Preset', value: 'digital_preset' },
                  { title: 'Video LUT', value: 'digital_lut' },
                  { title: 'Digital Bundle', value: 'digital_bundle' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              type: 'number',
              title: 'Quantity',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'unitPrice',
              type: 'number',
              title: 'Unit Price',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'totalPrice',
              type: 'number',
              title: 'Total Price',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'variant',
              type: 'object',
              title: 'Product Variant',
              fields: [
                {
                  name: 'size',
                  type: 'string',
                  title: 'Size',
                },
                {
                  name: 'material',
                  type: 'string',
                  title: 'Material',
                },
              ],
              hidden: ({ parent }) => parent?.productType !== 'print',
            },
            {
              name: 'fulfillmentStatus',
              type: 'string',
              title: 'Fulfillment Status',
              options: {
                list: [
                  { title: 'Pending', value: 'pending' },
                  { title: 'Processing', value: 'processing' },
                  { title: 'Shipped', value: 'shipped' },
                  { title: 'Delivered', value: 'delivered' },
                  { title: 'Digital Delivered', value: 'digital_delivered' },
                ],
              },
              initialValue: 'pending',
            },
            {
              name: 'trackingNumber',
              type: 'string',
              title: 'Tracking Number',
              hidden: ({ parent }) =>
                !['shipped', 'delivered'].includes(parent?.fulfillmentStatus),
            },
          ],
          preview: {
            select: {
              productName: 'productName',
              quantity: 'quantity',
              totalPrice: 'totalPrice',
              fulfillmentStatus: 'fulfillmentStatus',
            },
            prepare({ productName, quantity, totalPrice, fulfillmentStatus }) {
              return {
                title: productName,
                subtitle: `Qty: ${quantity} - $${totalPrice} - ${fulfillmentStatus}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'pricing',
      title: 'Order Pricing',
      type: 'object',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          title: 'Subtotal',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'shipping',
          type: 'number',
          title: 'Shipping',
          validation: (Rule) => Rule.min(0),
          initialValue: 0,
        },
        {
          name: 'tax',
          type: 'number',
          title: 'Tax',
          validation: (Rule) => Rule.min(0),
          initialValue: 0,
        },
        {
          name: 'discount',
          type: 'number',
          title: 'Discount',
          validation: (Rule) => Rule.min(0),
          initialValue: 0,
        },
        {
          name: 'total',
          type: 'number',
          title: 'Total',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'currency',
          type: 'string',
          title: 'Currency',
          initialValue: 'USD',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          type: 'string',
          title: 'First Name',
        },
        {
          name: 'lastName',
          type: 'string',
          title: 'Last Name',
        },
        {
          name: 'company',
          type: 'string',
          title: 'Company',
        },
        {
          name: 'address1',
          type: 'string',
          title: 'Address Line 1',
        },
        {
          name: 'address2',
          type: 'string',
          title: 'Address Line 2',
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
        },
        {
          name: 'province',
          type: 'string',
          title: 'State/Province',
        },
        {
          name: 'country',
          type: 'string',
          title: 'Country',
        },
        {
          name: 'zip',
          type: 'string',
          title: 'ZIP/Postal Code',
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone',
        },
      ],
      hidden: ({ document }) => {
        // Hide if order only contains digital products
        const items = document?.items || [];
        return items.every((item: any) => item.productType !== 'print');
      },
    }),
    defineField({
      name: 'billingAddress',
      title: 'Billing Address',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          type: 'string',
          title: 'First Name',
        },
        {
          name: 'lastName',
          type: 'string',
          title: 'Last Name',
        },
        {
          name: 'company',
          type: 'string',
          title: 'Company',
        },
        {
          name: 'address1',
          type: 'string',
          title: 'Address Line 1',
        },
        {
          name: 'address2',
          type: 'string',
          title: 'Address Line 2',
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
        },
        {
          name: 'province',
          type: 'string',
          title: 'State/Province',
        },
        {
          name: 'country',
          type: 'string',
          title: 'Country',
        },
        {
          name: 'zip',
          type: 'string',
          title: 'ZIP/Postal Code',
        },
      ],
    }),
    defineField({
      name: 'paymentDetails',
      title: 'Payment Details',
      type: 'object',
      fields: [
        {
          name: 'paymentMethod',
          type: 'string',
          title: 'Payment Method',
          options: {
            list: [
              { title: 'Credit Card', value: 'credit_card' },
              { title: 'PayPal', value: 'paypal' },
              { title: 'Apple Pay', value: 'apple_pay' },
              { title: 'Google Pay', value: 'google_pay' },
              { title: 'Bank Transfer', value: 'bank_transfer' },
            ],
          },
        },
        {
          name: 'paymentIntentId',
          type: 'string',
          title: 'Payment Intent ID',
          description: 'Stripe Payment Intent ID or similar',
        },
        {
          name: 'transactionId',
          type: 'string',
          title: 'Transaction ID',
        },
      ],
    }),
    defineField({
      name: 'digitalDelivery',
      title: 'Digital Delivery',
      type: 'object',
      fields: [
        {
          name: 'delivered',
          type: 'boolean',
          title: 'Delivered',
          initialValue: false,
        },
        {
          name: 'deliveredAt',
          type: 'datetime',
          title: 'Delivered At',
          hidden: ({ parent }) => !parent?.delivered,
        },
        {
          name: 'downloadCount',
          type: 'number',
          title: 'Total Downloads',
          initialValue: 0,
        },
        {
          name: 'lastDownloadAt',
          type: 'datetime',
          title: 'Last Download',
        },
      ],
      hidden: ({ document }) => {
        // Show only if order contains digital products
        const items = document?.items || [];
        return !items.some((item: any) => item.productType !== 'print');
      },
    }),
    defineField({
      name: 'notes',
      title: 'Order Notes',
      type: 'text',
      description: 'Internal notes about this order',
    }),
    defineField({
      name: 'customerNotes',
      title: 'Customer Notes',
      type: 'text',
      description: 'Notes from the customer',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
      hidden: ({ document }) => document?.status !== 'completed',
    }),
  ],

  preview: {
    select: {
      orderNumber: 'orderNumber',
      customerEmail: 'customer.email',
      total: 'pricing.total',
      status: 'status',
      createdAt: '_createdAt',
    },
    prepare({ orderNumber, customerEmail, total, status, createdAt }) {
      const date = new Date(createdAt).toLocaleDateString();
      return {
        title: `Order ${orderNumber}`,
        subtitle: `${customerEmail} - $${total} - ${status} - ${date}`,
      };
    },
  },

  orderings: [
    {
      title: 'Recent Orders',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Order Number',
      name: 'orderNumber',
      by: [{ field: 'orderNumber', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});
