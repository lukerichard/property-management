import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    // Check for auth cookie
    const cookieStore = cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get user from session (you'll need to implement proper session handling)
    // For now, we'll just return the first tenant user
    const user = await User.findOne({ role: 'tenant' });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    const response = await fetch('/api/auth/verify', {
      credentials: 'include' // Important for cookies to work
    });

    if (!response.ok) {
      throw new Error('Failed to verify user');
    }

    const data = await response.json();
    return NextResponse.json({
      user: userWithoutPassword,
      verification: data
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
} 