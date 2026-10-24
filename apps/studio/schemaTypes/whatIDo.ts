import { defineField, defineType } from 'sanity';
import { localeString, localeText } from './locale';

export const whatIDo = defineType({
  name: 'whatIDo',
  title: 'What I Do',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      description: 'Service highlights (2-6)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'APIs & integrations', value: 'backend' },
                  { title: 'Performance & reliability', value: 'performance' },
                  { title: 'Product development', value: 'product' },
                  { title: 'AI workflows', value: 'ai' },
                ],
              },
              validation: (r) => r.required(),
            }),
            localeString('title', 'Title'),
            localeText('text', 'Description'),
          ],
          preview: {
            select: { icon: 'icon', title: 'title.en' },
            prepare({ icon, title }) {
              return { title: `${icon || ''} ${title || ''}` };
            },
          },
        },
      ],
      validation: (r) => r.required().min(2).max(6),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'What I Do' };
    },
  },
});
