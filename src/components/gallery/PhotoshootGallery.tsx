'use client';

import { PhotoshootGallery as PhotoshootGalleryType } from '@/types/gallery';
import GalleryGrid from './GalleryGrid';

interface PhotoshootGalleryProps {
  gallery: PhotoshootGalleryType;
  className?: string;
}

export default function PhotoshootGallery({ gallery, className = '' }: PhotoshootGalleryProps) {
  const photoshootDetails = gallery.photoshootDetails;

  return (
    <div className={`photoshoot-gallery ${className}`}>
      {/* Photoshoot-specific header */}
      {photoshootDetails && (
        <div className="mb-8 p-6 bg-steeldark-800 rounded-lg border border-steelpolished-400/20">
          <h3 className="text-xl font-semibold text-steelpolished-400 mb-4 flex items-center gap-2">
            📸 Photoshoot Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {photoshootDetails.clientName && (
              <div>
                <span className="font-medium text-steelpolished-400">Client:</span>
                <span className="ml-2 text-steelpolished-500">{photoshootDetails.clientName}</span>
              </div>
            )}
            
            {photoshootDetails.shootType && (
              <div>
                <span className="font-medium text-steelpolished-400">Type:</span>
                <span className="ml-2 text-steelpolished-500 capitalize">{photoshootDetails.shootType}</span>
              </div>
            )}
            
            {photoshootDetails.makeupArtist && (
              <div>
                <span className="font-medium text-steelpolished-400">Makeup Artist:</span>
                <span className="ml-2 text-steelpolished-500">{photoshootDetails.makeupArtist}</span>
              </div>
            )}
            
            {photoshootDetails.locationDetails?.venue && (
              <div>
                <span className="font-medium text-steelpolished-400">Location:</span>
                <span className="ml-2 text-steelpolished-500">{photoshootDetails.locationDetails.venue}</span>
              </div>
            )}
          </div>
          
          {photoshootDetails.stylingNotes && (
            <div className="mt-4">
              <span className="font-medium text-steelpolished-400">Styling Notes:</span>
              <p className="mt-1 text-steelpolished-500">{photoshootDetails.stylingNotes}</p>
            </div>
          )}
        </div>
      )}

      {/* Gallery Grid with portrait-optimized layout */}
      <GalleryGrid
        gallery={gallery}
        displayConfig={{
          layout: 'grid',
          aspectRatio: 'portrait',
          showMetadata: true,
        }}
        className="portrait-optimized"
      />
    </div>
  );
}
