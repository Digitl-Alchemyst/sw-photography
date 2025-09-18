'use client';

import { ShowcaseGallery as ShowcaseGalleryType } from '@/types/gallery';
import GalleryGrid from './GalleryGrid';
import formatDate from '@/lib/util/formatDate';

interface ShowcaseGalleryProps {
  gallery: ShowcaseGalleryType;
  className?: string;
}

export default function ShowcaseGallery({ gallery, className = '' }: ShowcaseGalleryProps) {
  const showcaseDetails = gallery.showcaseDetails;

  return (
    <div className={`showcase-gallery ${className}`}>
      {/* Showcase-specific header */}
      {showcaseDetails && (
        <div className='mb-8 space-y-6'>
          {/* Artistic Statement */}
          {showcaseDetails.artisticStatement && (
            <div className='rounded-lg border border-steelpolished-400/20 bg-steeldark-800 p-6'>
              <h3 className='mb-4 flex items-center gap-2 text-xl font-semibold text-steelpolished-400'>
                🎨 Artist&apos;s Statement
              </h3>
              <p className='italic leading-relaxed text-steelpolished-500'>
                &quot;{showcaseDetails.artisticStatement}&quot;
              </p>
            </div>
          )}

          {/* Exhibition & Technical Details */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Exhibition Info */}
            {showcaseDetails.exhibitionInfo && (
              <div className='rounded-lg border border-steelpolished-400/20 bg-steeldark-800 p-6'>
                <h4 className='mb-3 text-lg font-semibold text-steelpolished-400'>
                  Exhibition Information
                </h4>
                <div className='space-y-2 text-sm'>
                  {showcaseDetails.exhibitionInfo.exhibitionName && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>Exhibition:</span>
                      <span className='ml-2 text-steelpolished-500'>
                        {showcaseDetails.exhibitionInfo.exhibitionName}
                      </span>
                    </div>
                  )}
                  {showcaseDetails.exhibitionInfo.gallery && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>Gallery:</span>
                      <span className='ml-2 text-steelpolished-500'>
                        {showcaseDetails.exhibitionInfo.gallery}
                      </span>
                    </div>
                  )}
                  {showcaseDetails.exhibitionInfo.exhibitionDate && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>Date:</span>
                      <span className='ml-2 text-steelpolished-500'>
                        {formatDate(showcaseDetails.exhibitionInfo.exhibitionDate)}
                      </span>
                    </div>
                  )}
                  {showcaseDetails.exhibitionInfo.curator && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>Curator:</span>
                      <span className='ml-2 text-steelpolished-500'>
                        {showcaseDetails.exhibitionInfo.curator}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Technical Details */}
            {showcaseDetails.techniqueDetails && (
              <div className='rounded-lg border border-steelpolished-400/20 bg-steeldark-800 p-6'>
                <h4 className='mb-3 text-lg font-semibold text-steelpolished-400'>
                  Technical Details
                </h4>
                <div className='space-y-2 text-sm'>
                  {showcaseDetails.techniqueDetails.technique && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>Technique:</span>
                      <span className='ml-2 capitalize text-steelpolished-500'>
                        {showcaseDetails.techniqueDetails.technique.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                  {showcaseDetails.techniqueDetails.postProcessing && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>Post-Processing:</span>
                      <p className='mt-1 text-steelpolished-500'>
                        {showcaseDetails.techniqueDetails.postProcessing}
                      </p>
                    </div>
                  )}
                  {showcaseDetails.techniqueDetails.specialEquipment && (
                    <div>
                      <span className='font-medium text-steelpolished-400'>
                        Special Equipment:
                      </span>
                      <p className='mt-1 text-steelpolished-500'>
                        {showcaseDetails.techniqueDetails.specialEquipment}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Awards */}
          {showcaseDetails.awards && showcaseDetails.awards.length > 0 && (
            <div className='rounded-lg border border-steelpolished-400/20 bg-steeldark-800 p-6'>
              <h4 className='mb-3 flex items-center gap-2 text-lg font-semibold text-steelpolished-400'>
                🏆 Awards & Recognition
              </h4>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                {showcaseDetails.awards.map((award, index) => (
                  <div
                    key={index}
                    className='rounded border border-steelpolished-400/10 bg-steeldark-700 p-3'
                  >
                    <div className='font-medium text-steelpolished-400'>{award.awardName}</div>
                    <div className='text-sm text-steelpolished-500'>
                      {award.organization} • {award.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gallery Grid with featured layout */}
      <GalleryGrid
        gallery={gallery}
        displayConfig={{
          layout: 'featured',
          aspectRatio: 'auto',
          showMetadata: true,
        }}
        className='featured-layout'
      />
    </div>
  );
}
