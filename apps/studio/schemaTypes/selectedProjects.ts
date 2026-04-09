import { defineField, defineType } from 'sanity';
import { localeString, localeText } from './locale';

export const selectedProjects = defineType({
  name: 'selectedProjects',
  title: 'Current Work',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'items',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'num',
              title: 'Number',
              type: 'string',
              description: 'e.g. "01", "02"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Project', value: 'project' },
                  { title: 'OSS Contribution', value: 'oss' },
                ],
                layout: 'radio',
              },
              initialValue: 'project',
              validation: (r) => r.required(),
            }),
            localeString('title', 'Title'),
            localeText('outcome', 'Outcome'),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
            defineField({
              name: 'liveUrl',
              title: 'Live URL',
              type: 'url',
            }),
            defineField({
              name: 'repos',
              title: 'GitHub Repos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      description: 'e.g. frontend, backend, docs',
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'url' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { num: 'num', title: 'title.en' },
            prepare({ num, title }) {
              return { title: `${num} — ${title || ''}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Current Work' };
    },
  },
});
