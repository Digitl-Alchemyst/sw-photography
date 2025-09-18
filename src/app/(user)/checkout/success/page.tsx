import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Download, Package, ArrowRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order Confirmed | SW Photography',
  description: 'Your order has been successfully placed. Thank you for your purchase!',
};

export default function CheckoutSuccessPage() {
  // In a real app, you'd get order details from the URL params or session
  const orderNumber = 'SW-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString();

  return (
    <main className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
      <div className='mx-auto max-w-4xl px-6 py-12'>
        {/* Success Header */}
        <div className='mb-12 text-center'>
          <div className='mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500'>
            <CheckCircle size={40} className='text-white' />
          </div>
          <h1 className='mb-4 text-4xl font-bold text-steelpolished-400'>Order Confirmed!</h1>
          <p className='mb-2 text-xl text-steelpolished-500'>Thank you for your purchase</p>
          <p className='text-steelpolished-500'>
            Order #{orderNumber} • Placed on {orderDate}
          </p>
        </div>

        {/* Order Details */}
        <div className='mb-8 rounded-lg border border-steeldark-600 bg-steeldark-800 p-8'>
          <h2 className='mb-6 text-2xl font-semibold text-steelpolished-400'>What&apos;s Next?</h2>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* Digital Products */}
            <div className='space-y-4'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='rounded-lg bg-accent/20 p-2'>
                  <Download size={24} className='text-accent' />
                </div>
                <div>
                  <h3 className='text-lg font-medium text-steelpolished-400'>Digital Products</h3>
                  <p className='text-sm text-steelpolished-500'>
                    Available for immediate download
                  </p>
                </div>
              </div>

              <div className='rounded-lg bg-steeldark-700/50 p-4'>
                <p className='mb-4 text-steelpolished-500'>
                  Your digital products are ready! Check your email for download links, or access
                  them from your account.
                </p>
                <div className='space-y-2'>
                  <button className='flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/90'>
                    <Download size={16} />
                    Download Now
                  </button>
                  <p className='text-center text-xs text-steelpolished-600'>
                    Download links expire in 7 days • 5 downloads remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Physical Products */}
            <div className='space-y-4'>
              <div className='mb-4 flex items-center gap-3'>
                <div className='rounded-lg bg-blue-500/20 p-2'>
                  <Package size={24} className='text-blue-400' />
                </div>
                <div>
                  <h3 className='text-lg font-medium text-steelpolished-400'>Physical Products</h3>
                  <p className='text-sm text-steelpolished-500'>Will be shipped to your address</p>
                </div>
              </div>

              <div className='rounded-lg bg-steeldark-700/50 p-4'>
                <p className='mb-4 text-steelpolished-500'>
                  Your prints will be carefully prepared and shipped within 3-5 business days.
                </p>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-steelpolished-500'>Estimated Delivery:</span>
                    <span className='text-steelpolished-400'>7-10 business days</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-steelpolished-500'>Tracking:</span>
                    <span className='text-steelpolished-400'>Will be emailed when shipped</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='mb-8 rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
          <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>Order Summary</h3>

          <div className='space-y-3'>
            {/* Mock order items */}
            <div className='flex items-center justify-between border-b border-steeldark-600 py-2'>
              <div>
                <h4 className='font-medium text-steelpolished-400'>Mountain Sunrise Print</h4>
                <p className='text-sm text-steelpolished-500'>
                  8&quot; x 10&quot; on Premium Paper
                </p>
              </div>
              <span className='font-medium text-steelpolished-400'>$32.50</span>
            </div>

            <div className='flex items-center justify-between border-b border-steeldark-600 py-2'>
              <div>
                <h4 className='font-medium text-steelpolished-400'>Moody Portrait Presets</h4>
                <p className='text-sm text-steelpolished-500'>Digital Download</p>
              </div>
              <span className='font-medium text-steelpolished-400'>$29.00</span>
            </div>

            <div className='space-y-2 pt-4'>
              <div className='flex justify-between text-steelpolished-500'>
                <span>Subtotal:</span>
                <span>$61.50</span>
              </div>
              <div className='flex justify-between text-steelpolished-500'>
                <span>Shipping:</span>
                <span>$15.00</span>
              </div>
              <div className='flex justify-between text-steelpolished-500'>
                <span>Tax:</span>
                <span>$5.23</span>
              </div>
              <hr className='border-steeldark-600' />
              <div className='flex justify-between text-lg font-semibold text-steelpolished-300'>
                <span>Total:</span>
                <span>$81.73</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className='mb-8 rounded-lg border border-steeldark-600 bg-steeldark-800 p-6'>
          <h3 className='mb-4 text-lg font-semibold text-steelpolished-400'>
            Important Information
          </h3>

          <div className='space-y-4 text-steelpolished-500'>
            <div>
              <h4 className='mb-1 font-medium text-steelpolished-400'>Order Confirmation</h4>
              <p className='text-sm'>
                A confirmation email has been sent to your email address with your order details
                and receipt.
              </p>
            </div>

            <div>
              <h4 className='mb-1 font-medium text-steelpolished-400'>Customer Support</h4>
              <p className='text-sm'>
                If you have any questions about your order, please contact us at{' '}
                <a
                  href='mailto:orders@swphotography.com'
                  className='text-accent hover:text-accent/80'
                >
                  orders@swphotography.com
                </a>
              </p>
            </div>

            <div>
              <h4 className='mb-1 font-medium text-steelpolished-400'>Returns & Exchanges</h4>
              <p className='text-sm'>
                Physical products can be returned within 30 days. Digital products are
                non-refundable after download.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Link href='/shop'>
            <button className='flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent/90'>
              Continue Shopping
              <ArrowRight size={16} />
            </button>
          </Link>

          <Link href='/'>
            <button className='flex items-center justify-center gap-2 rounded-lg border border-steeldark-600 px-6 py-3 text-steelpolished-400 transition-colors hover:border-steelpolished-400'>
              <Home size={16} />
              Back to Home
            </button>
          </Link>
        </div>

        {/* Newsletter Signup */}
        <div className='mt-12 text-center'>
          <div className='rounded-lg border border-steeldark-600 bg-steeldark-800 p-8'>
            <h3 className='mb-4 text-xl font-semibold text-steelpolished-400'>Stay Updated</h3>
            <p className='mb-6 text-steelpolished-500'>
              Get notified about new products, exclusive discounts, and photography tips.
            </p>
            <div className='mx-auto flex max-w-md flex-col gap-4 sm:flex-row'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 rounded-lg border border-steeldark-600 bg-steeldark-700 px-4 py-2 text-steelpolished-400 placeholder-steelpolished-500 focus:border-accent focus:outline-none'
              />
              <button className='rounded-lg bg-accent px-6 py-2 text-white transition-colors hover:bg-accent/90'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
