import { defineField, defineType } from 'sanity';
import { localeString, localeText } from './locale';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // Basic meta
    localeString('metaTitle', 'Meta Title'),
    localeText('metaDescription', 'Meta Description'),

    // Site identity
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'e.g. "Alessandro Chumpitaz"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'e.g. "https://alessandro.chumpitaz.dev"',
      validation: (r) => r.required(),
    }),

    // Open Graph / Social
    defineField({
      name: 'ogImage',
      title: 'OG Image (Social Share Banner)',
      type: 'image',
      description: 'Recommended: 1200x630px. Shows when shared on LinkedIn, X, Slack, etc.',
      options: { hotspot: true },
    }),

    // Twitter
    defineField({
      name: 'twitterHandle',
      title: 'Twitter/X Handle',
      type: 'string',
      description: 'e.g. "@alessandro54" (optional)',
    }),
    defineField({
      name: 'twitterCardType',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary Large Image', value: 'summary_large_image' },
          { title: 'Summary', value: 'summary' },
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
    }),

    // Theme colors
    defineField({
      name: 'themeColorDark',
      title: 'Theme Color (Dark)',
      type: 'string',
      description: 'Hex color for dark mode, e.g. "#09080f"',
      initialValue: '#09080f',
    }),
    defineField({
      name: 'themeColorLight',
      title: 'Theme Color (Light)',
      type: 'string',
      description: 'Hex color for light mode, e.g. "#f8f7fc"',
      initialValue: '#f8f7fc',
    }),

    // Apple
    defineField({
      name: 'appleTouchIcon',
      title: 'Apple Touch Icon',
      type: 'image',
      description: '180x180px PNG for iOS home screen bookmark',
    }),
    defineField({
      name: 'appleStatusBarStyle',
      title: 'Apple Status Bar Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Black', value: 'black' },
          { title: 'Black Translucent', value: 'black-translucent' },
        ],
        layout: 'radio',
      },
      initialValue: 'black-translucent',
    }),
    defineField({
      name: 'appleMobileWebAppTitle',
      title: 'Apple Mobile Web App Title',
      type: 'string',
      description: 'Short name shown under the icon on iOS home screen',
    }),

    // Robots
    defineField({
      name: 'robotsDirective',
      title: 'Robots Directive',
      type: 'string',
      description: 'e.g. "index, follow"',
      initialValue: 'index, follow',
    }),

    // Author
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Used in meta author tag',
    }),

    // Keywords
    localeString('keywords', 'Keywords'),
  ],
  preview: {
    prepare() {
      return { title: 'SEO' };
    },
  },
});
