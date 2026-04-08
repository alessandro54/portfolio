import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const HERO_DOC_ID = 'singleton-hero';
const TICKER_DOC_ID = 'singleton-ticker';

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
              .title('Hero')
              .id('hero')
              .schemaType('hero')
              .child(
                S.document()
                  .id('hero')
                  .title('Hero')
                  .schemaType('hero')
                  .documentId(HERO_DOC_ID),
              ),
            S.listItem()
              .title('Ticker')
              .id('ticker')
              .schemaType('ticker')
              .child(
                S.document()
                  .id('ticker')
                  .title('Ticker')
                  .schemaType('ticker')
                  .documentId(TICKER_DOC_ID),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !['hero', 'ticker'].includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
