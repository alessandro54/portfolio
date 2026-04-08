import { defineField } from 'sanity';

export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Spanish' },
];

export const localeString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fieldsets: [
      {
        title: 'Translations',
        name: 'translations',
        options: { collapsible: true, collapsed: true },
      },
    ],
    fields: supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: 'string' as const,
      fieldset: lang.isDefault ? undefined : 'translations',
    })),
  });

export const localeText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fieldsets: [
      {
        title: 'Translations',
        name: 'translations',
        options: { collapsible: true, collapsed: true },
      },
    ],
    fields: supportedLanguages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: 'text' as const,
      rows: 3,
      fieldset: lang.isDefault ? undefined : 'translations',
    })),
  });
