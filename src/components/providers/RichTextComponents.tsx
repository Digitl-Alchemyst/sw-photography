/* eslint-disable import/prefer-default-export */
import Image from 'next/image';
import Link from 'next/link';
import urlForImage from '@/lib/util/urlForImage';
import { Tweet } from 'react-tweet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const RichTextComponents = {
  types: {

    image: ({ value }: any) => {
      const alt = value.alt;
      return (
        <div className='my-3 space-y-1'>
          <div className='relative h-144 w-full rounded-lg '>
            <Image
              className='mx-auto object-contain border border-accent/70'
              src={urlForImage(value)?.url() || ''}
              alt={alt}
              fill
            />
          </div>
          <div className='flex justify-center'>
            <p className='rounded-lg border border-accent bg-steeldark-900/20 px-4 py-1 font-light text-sm text-steelpolished-400'>
              {alt}
            </p>
          </div>
        </div>
      );
    },

    codeBlock: ({ value }: any) => {
      const code = value.code;
      const language = value.language;
      return (
        <div className='mx-auto my-10 flex max-w-full justify-center'>
          <SyntaxHighlighter language={language} style={dark}>
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },

    youtubeEmbed: ({ value }: any) => {
      const videoId = value.videoId;
      return (
        <div className='mx-auto my-10 flex max-w-full items-center justify-center'>
          {/* Render YouTube embed using the video ID */}
          <iframe
            width='720'
            height='480'
            src={`https://www.youtube.com/embed/${videoId}`}
            title='YouTube Video Embed'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      );
    },

    twitterEmbed: ({ value }: any) => {
      const tweetId = value.tweetId;
      return (
        <div className='mx-auto my-10 flex max-w-full justify-center'>
          {/* Render Twitter embed using the ID and username */}
          <Tweet id={tweetId} />
        </div>
      );
    },

    instagramEmbed: ({ value }: any) => {
      const postId = value.postId;
      return (
        <div className='mx-auto my-10 flex max-w-full justify-center'>
          {/* Render Instagram embed using the post ID */}
          <blockquote
            className='instagram-media min-w-fit max-w-xl'
            data-instgrm-captioned
            data-instgrm-permalink={`https://www.instagram.com/p/${postId}`}
            data-instgrm-version='14'
          >
            <div>
              <Link
                href={`https://www.instagram.com/p/${postId}`}
                className='hover:sky-600 text-untele '
                target='_blank'
              >
                View this post on Instagram
              </Link>
            </div>
          </blockquote>
          <script async src='//www.instagram.com/embed.js'/>
        </div>
      );
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className='ml-10 list-disc space-y-5 py-5'>{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className='mt-lg list-decimal'>{children}</ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className='py-6 text-4xl font-bold md:text-5xl'>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='py-6 text-3xl font-bold md:text-4xl'>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='py-6 text-2xl font-bold md:text-3xl'>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='py-6 text-xl font-bold md:text-2xl'>{children}</h4>
    ),
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className='underline decoration-accent hover:text-accent2'
        >
          {children}
        </Link>
      );
    },

    blockquote: ({ children }: any) => (
      <blockquote className='boreder-l-accent my-5 border-l-4 py-5 pl-5'>
        {children}
      </blockquote>
    ),

    code: ({ children }: any) => (
      <div>
        <SyntaxHighlighter language='json' style={dark}>
          {children}
        </SyntaxHighlighter>
      </div>
    ),

    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => <strong>{children}</strong>,
    underline: ({ children }: any) => <u>{children}</u>,
    strikethrough: ({ children }: any) => <s>{children}</s>,
    superscript: ({ children }: any) => <sup>{children}</sup>,
    subscript: ({ children }: any) => <sub>{children}</sub>,

  },

};
