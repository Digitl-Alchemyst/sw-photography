'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Package,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { digitalDeliveryService } from '@/lib/ecommerce/digitalDeliveryService';
import { DigitalDownloadLink } from '@/types/printShop';

export default function DownloadPage() {
  const params = useParams();
  const token = params.token as string;

  const [downloadLink, setDownloadLink] = useState<DigitalDownloadLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const loadDownloadLink = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await digitalDeliveryService.processDownload(token);

      if (result.success && result.downloadLink) {
        setDownloadLink(result.downloadLink);
      } else {
        setError(result.error || 'Invalid download link');
      }
    } catch (err) {
      setError('Failed to load download link');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadDownloadLink();
    }
  }, [token, loadDownloadLink]);

  const handleDownload = async (fileName: string, fileUrl: string) => {
    setDownloading(fileName);

    try {
      // In a real implementation, this would handle the secure download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Refresh the download link to update the count
      setTimeout(() => {
        loadDownloadLink();
      }, 1000);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

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

  const getStatusColor = (downloadLink: DigitalDownloadLink) => {
    const now = new Date();
    const isExpired = now > downloadLink.expiresAt;
    const isMaxedOut = downloadLink.downloadCount >= downloadLink.maxDownloads;

    if (isExpired || isMaxedOut || !downloadLink.isActive) {
      return 'text-red-400';
    } else if (downloadLink.downloadCount > 0) {
      return 'text-yellow-400';
    } else {
      return 'text-green-400';
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
      <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='mx-auto max-w-4xl px-6 py-12'>
          <div className='text-center'>
            <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent' />
            <h1 className='mb-2 text-2xl font-bold text-steelpolished-400'>Loading Download</h1>
            <p className='text-steelpolished-500'>
              Please wait while we verify your download link...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='mx-auto max-w-4xl px-6 py-12'>
          <div className='text-center'>
            <AlertCircle size={64} className='mx-auto mb-6 text-red-400' />
            <h1 className='mb-4 text-3xl font-bold text-steelpolished-400'>
              Download Not Available
            </h1>
            <p className='mb-8 text-xl text-steelpolished-500'>{error}</p>

            <div className='space-y-4'>
              <p className='text-steelpolished-500'>This could happen if:</p>
              <ul className='mx-auto max-w-md space-y-2 text-left text-steelpolished-500'>
                <li>• The download link has expired</li>
                <li>• You&apos;ve reached the maximum number of downloads</li>
                <li>• The link is invalid or has been deactivated</li>
              </ul>
            </div>

            <div className='mt-8 space-y-4'>
              <button
                onClick={loadDownloadLink}
                className='inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent/90'
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              <div className='text-steelpolished-500'>
                <p>
                  Need help? Contact us at{' '}
                  <a
                    href='mailto:support@swphotography.com'
                    className='text-accent hover:text-accent/80'
                  >
                    support@swphotography.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!downloadLink) {
    return null;
  }

  return (
    <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto max-w-4xl px-6 py-12'>
        {/* Header */}
        <div className='mb-8'>
          <Link href='/shop'>
            <button className='mb-4 flex items-center gap-2 text-steelpolished-400 transition-colors hover:text-steelpolished-300'>
              <ArrowLeft size={20} />
              Back to Shop
            </button>
          </Link>
          <h1 className='text-3xl font-bold text-steelpolished-400'>Download Your Purchase</h1>
          <p className='mt-2 text-steelpolished-500'>Your digital product is ready for download</p>
        </div>

        {/* Product Info */}
        <div className='mb-6 rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
          <div className='flex items-start gap-4'>
            <div className='rounded-lg bg-accent/10 p-3'>
              <Package size={24} className='text-accent' />
            </div>
            <div className='flex-1'>
              <h2 className='mb-2 text-xl font-semibold text-steelpolished-400'>
                {downloadLink.productName}
              </h2>
              <p className='mb-4 text-steelpolished-500'>Order #{downloadLink.orderId}</p>

              {/* Download Status */}
              <div className='flex items-center gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      canDownload(downloadLink) ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  <span className={getStatusColor(downloadLink)}>
                    {canDownload(downloadLink) ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <div className='flex items-center gap-2 text-steelpolished-500'>
                  <Clock size={14} />
                  <span>{formatTimeRemaining(downloadLink.expiresAt)}</span>
                </div>

                <div className='flex items-center gap-2 text-steelpolished-500'>
                  <Download size={14} />
                  <span>
                    {downloadLink.downloadCount} of {downloadLink.maxDownloads} downloads used
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Files */}
        <div className='mb-6 rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
          <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>Files</h3>

          <div className='space-y-3'>
            {downloadLink.files.map((file, index) => (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg bg-steeldark-700/50 p-4'
              >
                <div className='flex items-center gap-3'>
                  <FileText size={20} className='text-steelpolished-400' />
                  <div>
                    <h4 className='font-medium text-steelpolished-400'>{file.name}</h4>
                    <p className='text-sm text-steelpolished-500'>
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(file.name, file.url)}
                  disabled={!canDownload(downloadLink) || downloading === file.name}
                  className='flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {downloading === file.name ? (
                    <>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
          <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>
            Important Information
          </h3>

          <div className='space-y-4 text-steelpolished-500'>
            <div className='flex items-start gap-3'>
              <CheckCircle size={16} className='mt-0.5 flex-shrink-0 text-green-400' />
              <div>
                <h4 className='mb-1 font-medium text-steelpolished-400'>Download Limit</h4>
                <p className='text-sm'>
                  You can download these files up to {downloadLink.maxDownloads} times. Current
                  usage: {downloadLink.downloadCount}/{downloadLink.maxDownloads}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Clock size={16} className='mt-0.5 flex-shrink-0 text-yellow-400' />
              <div>
                <h4 className='mb-1 font-medium text-steelpolished-400'>Expiration</h4>
                <p className='text-sm'>
                  This download link expires on {downloadLink.expiresAt.toLocaleDateString()} at{' '}
                  {downloadLink.expiresAt.toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <AlertCircle size={16} className='mt-0.5 flex-shrink-0 text-blue-400' />
              <div>
                <h4 className='mb-1 font-medium text-steelpolished-400'>Need Help?</h4>
                <p className='text-sm'>
                  If you&apos;re having trouble downloading or need to re-download after
                  expiration, contact us at{' '}
                  <a
                    href='mailto:support@swphotography.com'
                    className='text-accent hover:text-accent/80'
                  >
                    support@swphotography.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
