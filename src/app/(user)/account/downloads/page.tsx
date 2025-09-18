'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import {
  Download,
  Clock,
  Package,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  FileText,
} from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { digitalDeliveryService } from '@/lib/ecommerce/digitalDeliveryService';
import { DigitalDownloadLink } from '@/types/printShop';

export default function AccountDownloadsPage() {
  const { user } = useUser();
  const [downloadLinks, setDownloadLinks] = useState<DigitalDownloadLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDownloadLinks = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const links = await digitalDeliveryService.getCustomerDownloadLinks(user.id);
      setDownloadLinks(links);
    } catch (err) {
      setError('Failed to load download links');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadDownloadLinks();
    }
  }, [user, loadDownloadLinks]);

  const formatTimeRemaining = (expiresAt: Date): string => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();

    if (timeLeft <= 0) {
      return 'Expired';
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    } else {
      return 'Less than 1 hour remaining';
    }
  };

  const getStatusInfo = (downloadLink: DigitalDownloadLink) => {
    const now = new Date();
    const isExpired = now > downloadLink.expiresAt;
    const isMaxedOut = downloadLink.downloadCount >= downloadLink.maxDownloads;

    if (!downloadLink.isActive) {
      return { status: 'Deactivated', color: 'text-red-400', bgColor: 'bg-red-400/10' };
    } else if (isExpired) {
      return { status: 'Expired', color: 'text-red-400', bgColor: 'bg-red-400/10' };
    } else if (isMaxedOut) {
      return { status: 'Download Limit Reached', color: 'text-red-400', bgColor: 'bg-red-400/10' };
    } else if (downloadLink.downloadCount > 0) {
      return { status: 'In Use', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' };
    } else {
      return { status: 'Available', color: 'text-green-400', bgColor: 'bg-green-400/10' };
    }
  };

  const canDownload = (downloadLink: DigitalDownloadLink) => {
    const now = new Date();
    const isExpired = now > downloadLink.expiresAt;
    const isMaxedOut = downloadLink.downloadCount >= downloadLink.maxDownloads;

    return downloadLink.isActive && !isExpired && !isMaxedOut;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
          <div className='mx-auto max-w-6xl px-6 py-12'>
            <div className='text-center'>
              <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent' />
              <h1 className='mb-2 text-2xl font-bold text-steelpolished-400'>Loading Downloads</h1>
              <p className='text-steelpolished-500'>
                Please wait while we fetch your download history...
              </p>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='mx-auto max-w-6xl px-6 py-12'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-steelpolished-400'>My Downloads</h1>
                <p className='mt-2 text-steelpolished-500'>
                  Access your purchased digital products and download history
                </p>
              </div>
              <button
                onClick={loadDownloadLinks}
                className='flex items-center gap-2 rounded-lg border border-steeldark-600 bg-steeldark-800 px-4 py-2 text-steelpolished-400 transition-colors hover:border-steelpolished-400'
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className='mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4'>
              <div className='flex items-center gap-2 text-red-400'>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            </div>
          )}

          {downloadLinks.length === 0 ? (
            <div className='py-12 text-center'>
              <Package size={64} className='mx-auto mb-6 text-steelpolished-500' />
              <h2 className='mb-4 text-2xl font-bold text-steelpolished-400'>No Downloads Yet</h2>
              <p className='mx-auto mb-8 max-w-md text-steelpolished-500'>
                You haven&apos;t purchased any digital products yet. Browse our collection of
                presets and LUTs to get started.
              </p>
              <Link href='/shop'>
                <button className='rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent/90'>
                  Browse Digital Products
                </button>
              </Link>
            </div>
          ) : (
            <div className='space-y-6'>
              {downloadLinks.map((downloadLink) => {
                const statusInfo = getStatusInfo(downloadLink);

                return (
                  <div
                    key={downloadLink.id}
                    className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'
                  >
                    <div className='mb-4 flex items-start justify-between'>
                      <div className='flex items-start gap-4'>
                        <div className='rounded-lg bg-accent/10 p-3'>
                          <Package size={24} className='text-accent' />
                        </div>
                        <div>
                          <h3 className='mb-1 text-xl font-semibold text-steelpolished-400'>
                            {downloadLink.productName}
                          </h3>
                          <p className='mb-2 text-steelpolished-500'>
                            Order #{downloadLink.orderId} • Purchased{' '}
                            {downloadLink.createdAt.toLocaleDateString()}
                          </p>
                          <div className='flex items-center gap-4 text-sm'>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusInfo.color} ${statusInfo.bgColor}`}
                            >
                              {statusInfo.status}
                            </span>
                            <div className='flex items-center gap-1 text-steelpolished-500'>
                              <Clock size={12} />
                              <span>{formatTimeRemaining(downloadLink.expiresAt)}</span>
                            </div>
                            <div className='flex items-center gap-1 text-steelpolished-500'>
                              <Download size={12} />
                              <span>
                                {downloadLink.downloadCount}/{downloadLink.maxDownloads} downloads
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-2'>
                        {canDownload(downloadLink) ? (
                          <Link href={`/downloads/${downloadLink.token}`}>
                            <button className='flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/90'>
                              <Download size={16} />
                              Download
                            </button>
                          </Link>
                        ) : (
                          <button
                            disabled
                            className='flex cursor-not-allowed items-center gap-2 rounded-lg bg-steeldark-700 px-4 py-2 text-steelpolished-500'
                          >
                            <Download size={16} />
                            Unavailable
                          </button>
                        )}

                        <Link href={`/downloads/${downloadLink.token}`}>
                          <button className='rounded-lg p-2 text-steelpolished-400 transition-colors hover:bg-steeldark-700 hover:text-steelpolished-300'>
                            <ExternalLink size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Files List */}
                    <div className='border-t border-steeldark-600 pt-4'>
                      <h4 className='mb-3 text-sm font-medium text-steelpolished-400'>
                        Included Files
                      </h4>
                      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                        {downloadLink.files.map((file, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-3 rounded-lg bg-steeldark-700/50 p-3'
                          >
                            <FileText size={16} className='flex-shrink-0 text-steelpolished-400' />
                            <div className='min-w-0 flex-1'>
                              <p className='truncate text-sm font-medium text-steelpolished-400'>
                                {file.name}
                              </p>
                              <p className='text-xs text-steelpolished-500'>
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Help Text for Expired/Maxed Out Downloads */}
                    {!canDownload(downloadLink) && downloadLink.isActive && (
                      <div className='mt-4 border-t border-steeldark-600 pt-4'>
                        <div className='rounded-lg bg-steeldark-700/30 p-4'>
                          <div className='flex items-start gap-3'>
                            <AlertCircle
                              size={16}
                              className='mt-0.5 flex-shrink-0 text-yellow-400'
                            />
                            <div>
                              <h5 className='mb-1 font-medium text-steelpolished-400'>
                                Need to Re-download?
                              </h5>
                              <p className='text-sm text-steelpolished-500'>
                                This download has expired or reached its limit. Contact support at{' '}
                                <a
                                  href='mailto:support@swphotography.com'
                                  className='text-accent hover:text-accent/80'
                                >
                                  support@swphotography.com
                                </a>{' '}
                                for assistance with re-downloading your purchase.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Help Section */}
          <div className='mt-12 rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
            <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>Download Help</h3>
            <div className='grid grid-cols-1 gap-6 text-steelpolished-500 md:grid-cols-2'>
              <div>
                <h4 className='mb-2 font-medium text-steelpolished-400'>Download Limits</h4>
                <p className='text-sm'>
                  Each digital product can be downloaded up to 5 times within 7 days of purchase.
                  This helps protect our digital products while giving you flexibility.
                </p>
              </div>
              <div>
                <h4 className='mb-2 font-medium text-steelpolished-400'>Need Help?</h4>
                <p className='text-sm'>
                  Having trouble downloading? Lost your files? Contact us at{' '}
                  <a
                    href='mailto:support@swphotography.com'
                    className='text-accent hover:text-accent/80'
                  >
                    support@swphotography.com
                  </a>{' '}
                  and we&apos;ll help you out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
