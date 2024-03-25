import { client } from '@/lib/sanity.client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export default urlForImage;
