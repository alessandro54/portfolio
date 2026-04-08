import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const HERO_DOC_ID = 'singleton-hero';
const TICKER_DOC_ID = 'singleton-ticker';
const WHAT_I_DO_DOC_ID = 'singleton-whatIDo';
const WHY_ME_DOC_ID = 'singleton-whyMe';
const SELECTED_PROJECTS_DOC_ID = 'singleton-selectedProjects';

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
            S.listItem()
              .title('What I Do')
              .id('whatIDo')
              .schemaType('whatIDo')
              .child(
                S.document()
                  .id('whatIDo')
                  .title('What I Do')
                  .schemaType('whatIDo')
                  .documentId(WHAT_I_DO_DOC_ID),
              ),
            S.listItem()
              .title('Why Work With Me')
              .id('whyMe')
              .schemaType('whyMe')
              .child(
                S.document()
                  .id('whyMe')
                  .title('Why Work With Me')
                  .schemaType('whyMe')
                  .documentId(WHY_ME_DOC_ID),
              ),
            S.listItem()
              .title('Selected Projects')
              .id('selectedProjects')
              .schemaType('selectedProjects')
              .child(
                S.document()
                  .id('selectedProjects')
                  .title('Selected Projects')
                  .schemaType('selectedProjects')
                  .documentId(SELECTED_PROJECTS_DOC_ID),
              ),
            S.divider(),
            S.documentTypeListItem('experience').title('Career'),
            ...S.documentTypeListItems().filter((item) => !['hero', 'ticker', 'whatIDo', 'whyMe', 'selectedProjects', 'experience'].includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
