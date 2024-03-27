/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
*/

import 'server-only'

import { experimental_taintUniqueValue } from 'react'


// Sanity Credential Tokens
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)
  
export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)
  

//  Set the Studio URL Also used to configure edit intent links, for Presentation Mode
export const studioUrl = '/studio'

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'
  
// See the app/api/revalidate/route.ts for how this is used
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

// CMS Studio Title
export const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Steven Watkins Photography';


// Read Write Tokens (not sure how this taint works)
export const readToken = process.env.SANITY_API_READ_TOKEN
export const writeToken = process.env.SANITY_API_WRITE_TOKEN

if (!readToken) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}
if (!writeToken) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN');
}

experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  readToken,
);