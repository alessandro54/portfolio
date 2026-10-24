import { createClient } from '@sanity/client';

export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'sczvled1',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
};

export const sanityClient = createClient({
  ...sanityConfig,
  apiVersion: '2026-04-08',
  useCdn: false,
});
