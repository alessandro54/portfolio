import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const HERO_DOC_ID = 'singleton-hero';
const TICKER_DOC_ID = 'singleton-ticker';
const WHAT_I_DO_DOC_ID = 'singleton-whatIDo';
const WHY_ME_DOC_ID = 'singleton-whyMe';
const SELECTED_PROJECTS_DOC_ID = 'singleton-selectedProjects';
const CONTACT_DOC_ID = 'singleton-contact';
const SEO_DOC_ID = 'singleton-seo';

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
              .title('Current Work')
              .id('selectedProjects')
              .schemaType('selectedProjects')
              .child(
                S.document()
                  .id('selectedProjects')
                  .title('Current Work')
                  .schemaType('selectedProjects')
                  .documentId(SELECTED_PROJECTS_DOC_ID),
              ),
            S.listItem()
              .title('Contact')
              .id('contact')
              .schemaType('contact')
              .child(
                S.document()
                  .id('contact')
                  .title('Contact')
                  .schemaType('contact')
                  .documentId(CONTACT_DOC_ID),
              ),
            S.divider(),
            S.listItem()
              .title('SEO')
              .id('seo')
              .schemaType('seo')
              .child(
                S.document()
                  .id('seo')
                  .title('SEO')
                  .schemaType('seo')
                  .documentId(SEO_DOC_ID),
              ),
            S.divider(),
            S.documentTypeListItem('experience').title('Career'),
            ...S.documentTypeListItems().filter((item) => !['hero', 'ticker', 'whatIDo', 'whyMe', 'selectedProjects', 'contact', 'seo', 'experience', 'recentWork'].includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
