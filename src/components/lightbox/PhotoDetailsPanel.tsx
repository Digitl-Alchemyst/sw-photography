'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Camera, ShoppingCart, X, Tag, User, Award } from 'lucide-react';
import { PhotoData } from './PhotoLightbox';
import PrintOrderModal from '@/components/printShop/PrintOrderModal';

interface PhotoDetailsPanelProps {
  photo: PhotoData;
  isOpen: boolean;
  onClose: () => void;
  galleryTitle?: string;
  galleryDate?: string;
  photographer?: string;
  onOrderPrint?: () => void;
}

export default function PhotoDetailsPanel({
  photo,
  isOpen,
  onClose,
  galleryTitle,
  galleryDate,
  photographer,
  onOrderPrint,
}: PhotoDetailsPanelProps) {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='z-60 fixed inset-0 bg-steeldark-900/50 backdrop-blur-sm md:hidden'
            onClick={onClose}
          />

          {/* Details Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='z-60 fixed right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-steeldark-600 bg-steeldark-800/95 backdrop-blur-md md:w-96'
          >
            {/* Header */}
            <div className='flex items-center justify-between border-b border-steeldark-600 p-6'>
              <h3 className='text-lg font-semibold text-steelpolished-400'>Photo Details</h3>
              <button
                onClick={onClose}
                className='rounded-full p-1 text-steelpolished-400 transition-colors hover:bg-steeldark-700 hover:text-steelpolished-300'
                aria-label='Close details panel'
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className='space-y-6 p-6'>
              {/* Gallery Information */}
              {galleryTitle && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    Gallery
                  </h4>
                  <p className='text-steelpolished-400'>{galleryTitle}</p>
                </div>
              )}

              {/* Photo Title */}
              {photo.title && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    Title
                  </h4>
                  <p className='text-steelpolished-400'>{photo.title}</p>
                </div>
              )}

              {/* Location */}
              {photo.location && (
                <div className='space-y-2'>
                  <h4 className='flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    <MapPin size={16} />
                    Location
                  </h4>
                  <div className='text-steelpolished-400'>
                    {typeof photo.location === 'string' ? (
                      <p>{photo.location}</p>
                    ) : (
                      <div className='space-y-1'>
                        {photo.location.venue && (
                          <p>
                            <span className='text-steelpolished-500'>Venue:</span>{' '}
                            {photo.location.venue}
                          </p>
                        )}
                        {(photo.location.city ||
                          photo.location.state ||
                          photo.location.country) && (
                          <p>
                            <span className='text-steelpolished-500'>Location:</span>{' '}
                            {[photo.location.city, photo.location.state, photo.location.country]
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Date Taken */}
              {(photo.dateTaken || galleryDate) && (
                <div className='space-y-2'>
                  <h4 className='flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    <Calendar size={16} />
                    Date Taken
                  </h4>
                  <p className='text-steelpolished-400'>
                    {formatDate(photo.dateTaken || galleryDate)}
                  </p>
                </div>
              )}

              {/* Photographer */}
              {(photographer || photo.photographer) && (
                <div className='space-y-2'>
                  <h4 className='flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    <User size={16} />
                    Photographer
                  </h4>
                  <p className='text-steelpolished-400'>{photographer || photo.photographer}</p>
                </div>
              )}

              {/* Description */}
              {photo.description && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    Description
                  </h4>
                  <p className='leading-relaxed text-steelpolished-400'>{photo.description}</p>
                </div>
              )}

              {/* Tags */}
              {photo.tags && photo.tags.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    <Tag size={16} />
                    Tags
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {photo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='rounded border border-steelpolished-400/20 bg-steeldark-700 px-2 py-1 text-xs text-steelpolished-400'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Type Info */}
              {photo.gallery && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    Gallery Type
                  </h4>
                  <p className='capitalize text-steelpolished-400'>
                    {photo.gallery.type.replace('_', ' ')} Gallery
                  </p>
                </div>
              )}

              {/* Camera Settings */}
              {photo.cameraSettings && (
                <div className='space-y-2'>
                  <h4 className='flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    <Camera size={16} />
                    Camera Settings
                  </h4>
                  <div className='space-y-1 text-sm text-steelpolished-400'>
                    {photo.cameraSettings.camera && (
                      <p>
                        <span className='text-steelpolished-500'>Camera:</span>{' '}
                        {photo.cameraSettings.camera}
                      </p>
                    )}
                    {photo.cameraSettings.lens && (
                      <p>
                        <span className='text-steelpolished-500'>Lens:</span>{' '}
                        {photo.cameraSettings.lens}
                      </p>
                    )}
                    {photo.cameraSettings.focalLength && (
                      <p>
                        <span className='text-steelpolished-500'>Focal Length:</span>{' '}
                        {photo.cameraSettings.focalLength}
                      </p>
                    )}
                    {photo.cameraSettings.aperture && (
                      <p>
                        <span className='text-steelpolished-500'>Aperture:</span>{' '}
                        {photo.cameraSettings.aperture}
                      </p>
                    )}
                    {photo.cameraSettings.shutterSpeed && (
                      <p>
                        <span className='text-steelpolished-500'>Shutter Speed:</span>{' '}
                        {photo.cameraSettings.shutterSpeed}
                      </p>
                    )}
                    {photo.cameraSettings.iso && (
                      <p>
                        <span className='text-steelpolished-500'>ISO:</span>{' '}
                        {photo.cameraSettings.iso}
                      </p>
                    )}
                    {photo.cameraSettings.shootingMode && (
                      <p>
                        <span className='text-steelpolished-500'>Mode:</span>{' '}
                        {photo.cameraSettings.shootingMode.replace('_', ' ')}
                      </p>
                    )}
                    {photo.cameraSettings.meteringMode && (
                      <p>
                        <span className='text-steelpolished-500'>Metering:</span>{' '}
                        {photo.cameraSettings.meteringMode.replace('_', ' ')}
                      </p>
                    )}
                    {photo.cameraSettings.whiteBalance && (
                      <p>
                        <span className='text-steelpolished-500'>White Balance:</span>{' '}
                        {photo.cameraSettings.whiteBalance}
                      </p>
                    )}
                    {photo.cameraSettings.flashUsed && (
                      <p>
                        <span className='text-steelpolished-500'>Flash:</span>{' '}
                        {photo.cameraSettings.flashDetails || 'Used'}
                      </p>
                    )}
                    {photo.cameraSettings.fileFormat && (
                      <p>
                        <span className='text-steelpolished-500'>Format:</span>{' '}
                        {photo.cameraSettings.fileFormat.toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {photo.description && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                    Description
                  </h4>
                  <p className='leading-relaxed text-steelpolished-400'>{photo.description}</p>
                </div>
              )}

              {/* Print Options */}
              {photo.printOptions?.available && (
                <div className='space-y-4 border-t border-steeldark-600 pt-6'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-medium uppercase tracking-wide text-steelpolished-500'>
                      Print Options
                    </h4>
                    <div className='flex gap-2'>
                      {photo.printOptions.featured && (
                        <span className='rounded bg-accent/20 px-2 py-1 text-xs text-accent'>
                          Featured
                        </span>
                      )}
                      {photo.printOptions.limitedEdition && (
                        <span className='rounded bg-steelpolished-400/20 px-2 py-1 text-xs text-steelpolished-400'>
                          Limited Edition
                        </span>
                      )}
                    </div>
                  </div>

                  {photo.printOptions.printDescription && (
                    <p className='text-sm text-steelpolished-400'>
                      {photo.printOptions.printDescription}
                    </p>
                  )}

                  {photo.printOptions.limitedEdition && photo.printOptions.editionSize && (
                    <div className='text-sm text-steelpolished-400'>
                      <span className='text-steelpolished-500'>Edition:</span>{' '}
                      {photo.printOptions.printsSold || 0} of {photo.printOptions.editionSize} sold
                    </div>
                  )}

                  {photo.printOptions.pricingTiers &&
                  photo.printOptions.pricingTiers.length > 0 ? (
                    <div className='space-y-2'>
                      <p className='text-sm text-steelpolished-500'>Available options:</p>
                      <div className='space-y-2'>
                        {photo.printOptions.pricingTiers
                          .filter((tier) => tier.available)
                          .map((tier, index) => (
                            <div
                              key={index}
                              className='flex items-center justify-between rounded-md bg-steeldark-700 p-3'
                            >
                              <div>
                                <span className='text-steelpolished-300'>{tier.size}</span>
                                <span className='ml-2 text-sm text-steelpolished-500'>
                                  on {tier.material}
                                </span>
                              </div>
                              <span className='font-semibold text-steelpolished-200'>
                                ${tier.price}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {photo.printOptions.basePrice && (
                        <p className='text-steelpolished-400'>
                          Starting at{' '}
                          <span className='font-semibold'>${photo.printOptions.basePrice}</span>
                        </p>
                      )}

                      {photo.printOptions.sizes && photo.printOptions.sizes.length > 0 && (
                        <div className='space-y-2'>
                          <p className='text-sm text-steelpolished-500'>Available sizes:</p>
                          <div className='flex flex-wrap gap-2'>
                            {photo.printOptions.sizes.map((size, index) => (
                              <span
                                key={index}
                                className='rounded-md bg-steeldark-700 px-2 py-1 text-xs text-steelpolished-400'
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className='flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 font-medium text-white transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-steeldark-800'
                  >
                    <ShoppingCart size={18} />
                    Order Print
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Print Order Modal */}
          <PrintOrderModal
            photo={photo}
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
}
