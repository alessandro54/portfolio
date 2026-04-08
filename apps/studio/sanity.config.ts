import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const ABOUT_DOC_ID = 'singleton-about';

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'sczvled1',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About')
              .id('about')
              .schemaType('about')
              .child(
                S.document()
                  .id('about')
                  .title('About')
                  .schemaType('about')
                  .documentId(ABOUT_DOC_ID),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'about'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
