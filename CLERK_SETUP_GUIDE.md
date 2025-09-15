# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for your SW Photography e-commerce website.

## 🚀 Quick Setup Steps

### 1. Create a Clerk Account
1. Go to [clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application for your photography website
3. Choose your preferred authentication methods (email/password, Google, etc.)

### 2. Get Your API Keys
From your Clerk dashboard:
1. Go to **API Keys** in the sidebar
2. Copy your **Publishable Key** and **Secret Key**
3. Go to **Webhooks** and create a new webhook endpoint
4. Set the endpoint URL to: `https://yourdomain.com/api/webhooks/clerk`
5. Subscribe to these events:
   - `user.created`
   - `user.updated` 
   - `user.deleted`
6. Copy the **Webhook Secret**

### 3. Update Environment Variables
Replace the placeholder values in your `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
CLERK_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/account
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/account
```

### 4. Configure Clerk Dashboard Settings
In your Clerk dashboard:

#### Authentication Settings:
- **Sign-in URL**: `/sign-in`
- **Sign-up URL**: `/sign-up`
- **After sign-in URL**: `/account`
- **After sign-up URL**: `/account`

#### User Profile Settings:
- Enable **First Name** and **Last Name** (required)
- Enable **Phone Number** (optional)
- Enable **Profile Image** (optional)

#### Social Providers (Optional):
- Configure Google, Facebook, or other social login providers as needed

### 5. Update Sanity Schemas
The customer schema has been added to your Sanity project. You'll need to:

1. Deploy the new schemas to your Sanity studio:
   ```bash
   npm run sanity:deploy
   ```

2. The new `customer` schema will sync user data from Clerk automatically via webhooks

## 🔧 What's Been Implemented

### ✅ Authentication System
- **Sign-in/Sign-up pages** with custom styling matching your brand
- **Protected routes** for account pages
- **Middleware** to handle authentication across the app
- **Automatic redirects** for unauthenticated users

### ✅ User Management
- **Customer schema** in Sanity that syncs with Clerk users
- **Webhook handler** that automatically creates/updates customer records
- **Customer service** for managing user data and preferences
- **Account dashboard** with real user data integration

### ✅ E-commerce Integration
- **Order association** with authenticated users
- **Digital delivery** system linked to user accounts
- **Download history** accessible through user accounts
- **Guest checkout** still supported for non-authenticated users

### ✅ UI Components
- **Account pages** fully integrated with Clerk authentication
- **Protected route wrapper** for secure pages
- **Loading states** and error handling
- **Sign-out functionality** in account dashboard

## 🎯 Features Available After Setup

### For Customers:
- **Secure account creation** and login
- **Order history** and tracking
- **Digital download access** with secure links
- **Profile management** and preferences
- **Address book** for shipping

### For Admin:
- **Customer management** in Sanity CMS
- **Order tracking** with customer association
- **User analytics** and insights
- **Customer support** tools

## 🔒 Security Features

- **Secure authentication** with industry-standard practices
- **Protected API routes** with middleware
- **Webhook verification** for data integrity
- **Token-based downloads** with expiration
- **User session management**

## 🚀 Next Steps After Setup

1. **Test the authentication flow**:
   - Try signing up with a new account
   - Test sign-in/sign-out functionality
   - Verify account dashboard access

2. **Configure email templates** in Clerk dashboard for:
   - Welcome emails
   - Password reset emails
   - Email verification

3. **Set up social providers** if desired (Google, Facebook, etc.)

4. **Test webhook integration**:
   - Create a test user and verify it appears in Sanity
   - Update user profile and check sync

5. **Customize branding** in Clerk dashboard to match your photography brand

## 🆘 Troubleshooting

### Common Issues:

**Webhook not working?**
- Verify the webhook URL is publicly accessible
- Check that the webhook secret matches your environment variable
- Ensure your server is running and the endpoint is responding

**Users not syncing to Sanity?**
- Check webhook logs in Clerk dashboard
- Verify Sanity client configuration
- Check server logs for errors

**Authentication redirects not working?**
- Verify middleware configuration
- Check that redirect URLs match Clerk dashboard settings
- Ensure environment variables are loaded correctly

## 📞 Support

If you encounter any issues:
1. Check the Clerk documentation: [docs.clerk.com](https://docs.clerk.com)
2. Review the implementation in your codebase
3. Check browser console and server logs for errors

The authentication system is now fully integrated and ready for production use!
