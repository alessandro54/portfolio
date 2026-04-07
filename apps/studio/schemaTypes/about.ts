import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'object',
      fields: [
        defineField({name: 'github', title: 'GitHub', type: 'url'}),
        defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
        defineField({name: 'x', title: 'X (Twitter)', type: 'url'}),
        defineField({name: 'email', title: 'Email', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'location', media: 'avatar'},
    prepare({title, media}) {
      return {title: 'About', subtitle: title, media}
    },
  },
})
