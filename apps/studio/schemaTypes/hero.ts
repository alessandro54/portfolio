import { defineField, defineType } from 'sanity';
import { localeString, localeText } from './locale';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    localeString('badge', 'Badge'),
    localeString('headline', 'Headline'),
    localeString('subheadline', 'Subheadline'),
    localeText('description', 'Description'),
    localeString('ctaLabel', 'CTA Label'),
    localeString('secondaryCtaLabel', 'Secondary CTA Label'),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'e.g. "k", "+"',
            }),
            localeString('label', 'Label'),
          ],
          preview: {
            select: { value: 'value', suffix: 'suffix', label: 'label.en' },
            prepare({ value, suffix, label }) {
              return { title: `${value}${suffix || ''} — ${label || ''}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hero' };
    },
  },
});
