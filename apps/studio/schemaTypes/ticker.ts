import { defineField, defineType } from 'sanity';
import { localeString } from './locale';

export const ticker = defineType({
  name: 'ticker',
  title: 'Ticker',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [localeString('label', 'Label')],
          preview: {
            select: { label: 'label.en' },
            prepare({ label }) {
              return { title: label || '' };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Ticker' };
    },
  },
});
