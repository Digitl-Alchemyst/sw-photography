'use client';

import { EventGallery as EventGalleryType } from '@/types/gallery';
import GalleryGrid from './GalleryGrid';
import formatDate from '@/lib/util/formatDate';

interface EventGalleryProps {
  gallery: EventGalleryType;
  className?: string;
}

export default function EventGallery({ gallery, className = '' }: EventGalleryProps) {
  const eventDetails = gallery.eventDetails;

  return (
    <div className={`event-gallery ${className}`}>
      {/* Event-specific header */}
      {eventDetails && (
        <div className="mb-8 p-6 bg-steeldark-800 rounded-lg border border-steelpolished-400/20">
          <h3 className="text-xl font-semibold text-steelpolished-400 mb-4 flex items-center gap-2">
            🎉 Event Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {eventDetails.eventName && (
              <div>
                <span className="font-medium text-steelpolished-400">Event:</span>
                <span className="ml-2 text-steelpolished-500">{eventDetails.eventName}</span>
              </div>
            )}
            
            {eventDetails.eventType && (
              <div>
                <span className="font-medium text-steelpolished-400">Type:</span>
                <span className="ml-2 text-steelpolished-500 capitalize">{eventDetails.eventType}</span>
              </div>
            )}
            
            {eventDetails.venue && (
              <div>
                <span className="font-medium text-steelpolished-400">Venue:</span>
                <span className="ml-2 text-steelpolished-500">{eventDetails.venue}</span>
              </div>
            )}
            
            {eventDetails.eventDate && (
              <div>
                <span className="font-medium text-steelpolished-400">Date:</span>
                <span className="ml-2 text-steelpolished-500">{formatDate(eventDetails.eventDate)}</span>
              </div>
            )}
            
            {eventDetails.duration && (
              <div>
                <span className="font-medium text-steelpolished-400">Duration:</span>
                <span className="ml-2 text-steelpolished-500">{eventDetails.duration}</span>
              </div>
            )}
            
            {eventDetails.attendeeCount && (
              <div>
                <span className="font-medium text-steelpolished-400">Attendees:</span>
                <span className="ml-2 text-steelpolished-500">{eventDetails.attendeeCount}</span>
              </div>
            )}
          </div>
          
          {eventDetails.eventDescription && (
            <div className="mt-4">
              <span className="font-medium text-steelpolished-400">Description:</span>
              <p className="mt-1 text-steelpolished-500">{eventDetails.eventDescription}</p>
            </div>
          )}
        </div>
      )}

      {/* Gallery Grid with timeline layout */}
      <GalleryGrid
        gallery={gallery}
        displayConfig={{
          layout: 'timeline',
          aspectRatio: 'auto',
          showMetadata: true,
        }}
        className="timeline-layout"
      />
    </div>
  );
}
