import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'n4aeoqhx',
  dataset: 'production',
  apiVersion: '2022-11-25',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
