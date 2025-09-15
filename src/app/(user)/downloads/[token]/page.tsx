'use client';

import { useState, useEffect } from 'react';
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
  RefreshCw
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

  useEffect(() => {
    if (token) {
      loadDownloadLink();
    }
  }, [token]);

  const loadDownloadLink = async () => {
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
  };

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
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
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
      <main className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <h1 className="text-2xl font-bold text-steelpolished-400 mb-2">Loading Download</h1>
            <p className="text-steelpolished-500">Please wait while we verify your download link...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <AlertCircle size={64} className="mx-auto text-red-400 mb-6" />
            <h1 className="text-3xl font-bold text-steelpolished-400 mb-4">Download Not Available</h1>
            <p className="text-xl text-steelpolished-500 mb-8">{error}</p>
            
            <div className="space-y-4">
              <p className="text-steelpolished-500">
                This could happen if:
              </p>
              <ul className="text-left text-steelpolished-500 space-y-2 max-w-md mx-auto">
                <li>• The download link has expired</li>
                <li>• You've reached the maximum number of downloads</li>
                <li>• The link is invalid or has been deactivated</li>
              </ul>
            </div>
            
            <div className="mt-8 space-y-4">
              <button
                onClick={loadDownloadLink}
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
              
              <div className="text-steelpolished-500">
                <p>Need help? Contact us at{' '}
                  <a href="mailto:support@swphotography.com" className="text-accent hover:text-accent/80">
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
    <main className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/shop">
            <button className="flex items-center gap-2 text-steelpolished-400 hover:text-steelpolished-300 transition-colors mb-4">
              <ArrowLeft size={20} />
              Back to Shop
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-steelpolished-400">Download Your Purchase</h1>
          <p className="text-steelpolished-500 mt-2">
            Your digital product is ready for download
          </p>
        </div>

        {/* Product Info */}
        <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Package size={24} className="text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-steelpolished-400 mb-2">
                {downloadLink.productName}
              </h2>
              <p className="text-steelpolished-500 mb-4">
                Order #{downloadLink.orderId}
              </p>
              
              {/* Download Status */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    canDownload(downloadLink) ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <span className={getStatusColor(downloadLink)}>
                    {canDownload(downloadLink) ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-steelpolished-500">
                  <Clock size={14} />
                  <span>{formatTimeRemaining(downloadLink.expiresAt)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-steelpolished-500">
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
        <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-steelpolished-400 mb-4">Files</h3>
          
          <div className="space-y-3">
            {downloadLink.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-steeldark-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-steelpolished-400" />
                  <div>
                    <h4 className="font-medium text-steelpolished-400">{file.name}</h4>
                    <p className="text-sm text-steelpolished-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDownload(file.name, file.url)}
                  disabled={!canDownload(downloadLink) || downloading === file.name}
                  className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {downloading === file.name ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
        <div className="bg-steeldark-800 border border-steeldark-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-steelpolished-400 mb-4">Important Information</h3>
          
          <div className="space-y-4 text-steelpolished-500">
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-steelpolished-400 mb-1">Download Limit</h4>
                <p className="text-sm">
                  You can download these files up to {downloadLink.maxDownloads} times. 
                  Current usage: {downloadLink.downloadCount}/{downloadLink.maxDownloads}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-steelpolished-400 mb-1">Expiration</h4>
                <p className="text-sm">
                  This download link expires on {downloadLink.expiresAt.toLocaleDateString()} at{' '}
                  {downloadLink.expiresAt.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-steelpolished-400 mb-1">Need Help?</h4>
                <p className="text-sm">
                  If you're having trouble downloading or need to re-download after expiration, 
                  contact us at{' '}
                  <a href="mailto:support@swphotography.com" className="text-accent hover:text-accent/80">
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
