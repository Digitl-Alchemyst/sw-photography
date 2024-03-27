/* eslint-disable import/prefer-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { validatePreviewUrl } from '@sanity/preview-url-secret';

import { client } from '@/lib/sanity/client';
import { readToken as token } from '@/lib/sanity/api';

const clientWithToken = client.withConfig({ token });

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Ensure req.url is defined before passing it to validatePreviewUrl
  const url = req.url || '';

  const { isValid, redirectTo } = await validatePreviewUrl(
    clientWithToken,
    url, // Use the guaranteed non-undefined url here
  );
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  // Enable draft mode
  draftMode().enable();

  // Redirect to root path
  if (redirectTo) {
    redirect(redirectTo);
  }
}
