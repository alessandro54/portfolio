import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'sczvled1',
  dataset: 'production',
  apiVersion: '2026-04-08',
  useCdn: true,
});
