# Lightbox/Modal Overlay System & Print Shop Integration

## Overview

This implementation provides a comprehensive lightbox/modal overlay system for the photography gallery with integrated print shop functionality. The system replaces the previous behavior where photos opened in new tabs with a sophisticated full-screen lightbox experience.

## Features Implemented

### 1. Lightbox Functionality ✅
- **Full-screen modal overlay** with smooth animations
- **Navigation controls** (previous/next arrows, close button)
- **Keyboard navigation** support:
  - Arrow keys for navigation
  - Escape to close
  - 'i' key to toggle photo details
- **Touch gesture support** for mobile devices:
  - Swipe left/right for navigation
  - Pinch-to-zoom prevention
- **Smooth transitions** using Framer Motion
- **Loading states** with animated spinners

### 2. Photo Details Panel ✅
- **Responsive right-side panel** with photo metadata
- **Comprehensive photo information**:
  - Title, location, date taken
  - Camera settings (camera, lens, focal length, aperture, shutter speed, ISO)
  - Description
  - Gallery information
  - Photographer details
- **Mobile-optimized** with overlay behavior on small screens
- **Print shop integration** with "Order Print" button

### 3. Print Shop Integration ✅
- **Complete print shop framework** ready for third-party integration
- **Flexible architecture** supporting multiple print providers:
  - Printful
  - Printify
  - Custom providers
- **Print product configuration**:
  - Multiple sizes (5x7 to 30x40)
  - Various materials (Standard Paper, Premium Paper, Canvas, Metal, Acrylic)
  - Quantity selection
  - Dynamic pricing calculation
- **Shopping cart system**:
  - Add/remove items
  - Quantity updates
  - Persistent storage (localStorage)
  - Cart icon with item count badge
- **Print order modal** with size/material selection

### 4. Enhanced Sanity Schema ✅
Extended gallery photo schema with print-specific fields:
- Photo metadata (title, location, date, description)
- Camera settings object
- Print options configuration
- Print shop integration IDs

## File Structure

```
src/
├── components/
│   ├── lightbox/
│   │   ├── PhotoLightbox.tsx          # Main lightbox component
│   │   └── PhotoDetailsPanel.tsx      # Photo metadata panel
│   ├── gallery/
│   │   ├── GalleryPhoto.tsx           # Individual photo component
│   │   └── GalleryGrid.tsx            # Gallery grid with lightbox integration
│   ├── printShop/
│   │   ├── PrintOrderModal.tsx        # Print ordering interface
│   │   ├── ShoppingCart.tsx           # Shopping cart component
│   │   └── CartIcon.tsx               # Cart icon with badge
│   ├── home/
│   │   └── FeaturedPhotosGrid.tsx     # Featured photos with lightbox
│   └── global/
│       ├── SidebarWithCart.tsx        # Sidebar with cart integration
│       └── MobileNavWithCart.tsx      # Mobile nav with cart
├── contexts/
│   └── PrintShopContext.tsx           # Print shop state management
├── hooks/
│   └── useLightbox.ts                 # Lightbox state hook
├── lib/
│   └── printShop/
│       └── printShopService.ts        # Print shop business logic
├── types/
│   └── printShop.ts                   # Print shop type definitions
└── schemaTypes/
    └── gallery.ts                     # Enhanced Sanity schema
```

## Usage

### Basic Lightbox Usage

```tsx
import PhotoLightbox from '@/components/lightbox/PhotoLightbox';
import useLightbox from '@/hooks/useLightbox';

function GalleryComponent() {
  const lightbox = useLightbox();
  
  const handlePhotoClick = (index: number) => {
    lightbox.openLightbox(photoData, index);
  };

  return (
    <>
      {/* Gallery photos */}
      <PhotoLightbox
        photos={lightbox.photos}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.closeLightbox}
        onNavigate={lightbox.navigateToPhoto}
      />
    </>
  );
}
```

### Print Shop Integration

```tsx
import { usePrintShop } from '@/contexts/PrintShopContext';

function Component() {
  const { addToCart, cartCount, cartTotal } = usePrintShop();
  
  const handleOrderPrint = (product) => {
    addToCart(product);
  };
}
```

## Configuration

### Print Shop Provider Configuration

Set environment variables for print service integration:

```env
NEXT_PUBLIC_PRINT_SHOP_URL=your_print_service_url
NEXT_PUBLIC_PRINT_SHOP_API_KEY=your_api_key
```

### Customizing Print Options

Modify `src/types/printShop.ts` to adjust:
- Available print sizes
- Material options
- Pricing structure
- Print provider settings

## Keyboard Shortcuts

- **Arrow Keys**: Navigate between photos
- **Escape**: Close lightbox
- **I**: Toggle photo details panel

## Mobile Gestures

- **Swipe Left**: Next photo
- **Swipe Right**: Previous photo
- **Tap**: Close lightbox (on overlay)

## Accessibility Features

- **ARIA labels** for all interactive elements
- **Keyboard navigation** support
- **Focus management** within modal
- **Screen reader** compatible
- **High contrast** support with existing color scheme

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- **Lazy loading** for non-visible images
- **Image optimization** with Next.js Image component
- **Efficient re-renders** with React hooks
- **Gesture debouncing** for smooth interactions
- **Memory management** for large galleries

## Future Enhancements

1. **Payment Processing Integration**
   - Stripe/PayPal integration
   - Order tracking system
   - Email notifications

2. **Advanced Print Options**
   - Framing options
   - Custom sizing
   - Bulk ordering discounts

3. **Social Features**
   - Photo sharing
   - Favorites system
   - User accounts

4. **Analytics Integration**
   - Photo view tracking
   - Print order analytics
   - User behavior insights

## Testing

The implementation includes:
- **Responsive design** testing across devices
- **Touch gesture** validation on mobile
- **Keyboard navigation** verification
- **Print shop workflow** testing
- **Performance** optimization validation

## Dependencies Added

- `framer-motion`: Smooth animations and transitions
- `lucide-react`: Modern icon library
- `@use-gesture/react`: Touch gesture handling

## Color Scheme Compliance

All components maintain consistency with the existing steeldark-900 and steelpolished-400 color scheme, ensuring seamless integration with the current design system.
