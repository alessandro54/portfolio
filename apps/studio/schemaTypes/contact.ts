import { defineField, defineType } from 'sanity';

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) =>
        r
          .required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false }),
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'resumes',
      title: 'Resumes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',
              options: {
                accept: '.pdf',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'locale',
              title: 'Locale',
              type: 'string',
              options: {
                list: [
                  { title: 'English', value: 'en' },
                  { title: 'Spanish', value: 'es' },
                ],
                layout: 'radio',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Optional description for this resume',
            }),
          ],
          preview: {
            select: { label: 'label', locale: 'locale', date: 'date' },
            prepare({ label, locale, date }) {
              return {
                title: label || `Resume (${locale || 'unknown'})`,
                subtitle: date,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact' };
    },
  },
});
