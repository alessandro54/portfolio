import { defineField, defineType } from 'sanity';
import { localeString, localeText } from './locale';

export const whyMe = defineType({
  name: 'whyMe',
  title: 'Why Work With Me',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    localeString('featureHeadlinePre', 'Feature Headline (before emphasis)'),
    localeString('featureHeadlineEmphasis', 'Feature Headline (emphasis)'),
    localeString('featureHeadlinePost', 'Feature Headline (after emphasis)'),
    localeText('featureParagraph1', 'Feature Paragraph 1'),
    localeText('featureParagraph2', 'Feature Paragraph 2'),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'n',
              title: 'Number',
              type: 'string',
              description: 'e.g. "01", "02"',
              validation: (r) => r.required(),
            }),
            localeString('title', 'Title'),
            localeText('text', 'Text'),
          ],
          preview: {
            select: { n: 'n', title: 'title.en' },
            prepare({ n, title }) {
              return { title: `${n} — ${title || ''}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Why Work With Me' };
    },
  },
});
