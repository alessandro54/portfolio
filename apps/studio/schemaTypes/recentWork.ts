import { defineField, defineType } from 'sanity';

export const recentWork = defineType({
  name: 'recentWork',
  title: 'Recent Work',
  type: 'document',
  fields: [
    defineField({
      name: 'repo',
      title: 'Repository',
      type: 'string',
      description: 'e.g. vercel/next.js',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'prTitle',
      title: 'PR Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'prUrl',
      title: 'PR URL',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mergedAt',
      title: 'Merged At',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'prTitle', subtitle: 'repo' },
  },
  orderings: [
    {
      title: 'Merged, newest',
      name: 'mergedAtDesc',
      by: [{ field: 'mergedAt', direction: 'desc' }],
    },
  ],
});
