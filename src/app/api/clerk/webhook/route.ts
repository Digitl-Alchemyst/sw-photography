import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { client } from '@/lib/sanity/client';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  // Check if webhook secret is available
  if (!webhookSecret) {
    return new Response('Webhook secret not configured', {
      status: 500,
    });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret!);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log(`Webhook received: ${eventType}`);

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;
      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Error processing webhook', {
      status: 500,
    });
  }
}

async function handleUserCreated(userData: any) {
  console.log('Creating user in Sanity:', userData.id);

  const customerData = {
    _type: 'customer',
    clerkId: userData.id,
    email: userData.email_addresses[0]?.email_address || '',
    firstName: userData.first_name || '',
    lastName: userData.last_name || '',
    phone: userData.phone_numbers[0]?.phone_number || '',
    profileImage: userData.image_url || '',
    preferences: {
      emailMarketing: false,
      orderUpdates: true,
      newProductAlerts: false,
      currency: 'USD',
    },
    stats: {
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
    },
    tags: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const result = await client.create(customerData);
    console.log('Customer created in Sanity:', result._id);
  } catch (error) {
    console.error('Error creating customer in Sanity:', error);
    throw error;
  }
}

async function handleUserUpdated(userData: any) {
  console.log('Updating user in Sanity:', userData.id);

  try {
    // Find the customer by Clerk ID
    const existingCustomer = await client.fetch(
      `*[_type == "customer" && clerkId == $clerkId][0]`,
      { clerkId: userData.id },
    );

    if (!existingCustomer) {
      console.log('Customer not found, creating new one');
      await handleUserCreated(userData);
      return;
    }

    // Update the customer data
    const updateData = {
      email: userData.email_addresses[0]?.email_address || existingCustomer.email,
      firstName: userData.first_name || existingCustomer.firstName,
      lastName: userData.last_name || existingCustomer.lastName,
      phone: userData.phone_numbers[0]?.phone_number || existingCustomer.phone,
      profileImage: userData.image_url || existingCustomer.profileImage,
      updatedAt: new Date().toISOString(),
    };

    const result = await client.patch(existingCustomer._id).set(updateData).commit();

    console.log('Customer updated in Sanity:', result._id);
  } catch (error) {
    console.error('Error updating customer in Sanity:', error);
    throw error;
  }
}

async function handleUserDeleted(userData: any) {
  console.log('Deleting user in Sanity:', userData.id);

  try {
    // Find the customer by Clerk ID
    const existingCustomer = await client.fetch(
      `*[_type == "customer" && clerkId == $clerkId][0]`,
      { clerkId: userData.id },
    );

    if (!existingCustomer) {
      console.log('Customer not found in Sanity');
      return;
    }

    // Instead of deleting, mark as inactive to preserve order history
    const result = await client
      .patch(existingCustomer._id)
      .set({
        isActive: false,
        updatedAt: new Date().toISOString(),
      })
      .commit();

    console.log('Customer marked as inactive in Sanity:', result._id);
  } catch (error) {
    console.error('Error deactivating customer in Sanity:', error);
    throw error;
  }
}
