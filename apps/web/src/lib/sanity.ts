import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'sczvled1';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-04-08',
  useCdn: true,
});
