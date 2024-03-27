import { client } from '@/lib/sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const imageBuilder = createImageUrlBuilder(client);

// Returns a full sized auto formatted image for used in the <img> tag.
export default function urlForImage(source: Image | undefined) {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
}

// Returns a 1200x627 cropped image for use in the Open Graph meta & twitter tags.
export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url();
}
