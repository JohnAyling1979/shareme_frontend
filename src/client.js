import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import config from './config';

export const client = sanityClient(config.sanity);

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
