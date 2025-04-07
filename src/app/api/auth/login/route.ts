import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    console.log('Starting login process...');
    
    // Connect to database
    try {
      await connectDB();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const { email, password, role } = await req.json();
    console.log('Login attempt:', { email, role });

    // Find user by email and role
    let user;
    try {
      user = await User.findOne({ email, role });
      console.log('User search result:', user ? { id: user._id, email: user.email, role: user.role } : 'not found');
    } catch (userError) {
      console.error('Error finding user:', userError);
      return NextResponse.json(
        { error: 'Error finding user' },
        { status: 500 }
      );
    }
    
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare passwords using the model's method
    let isPasswordValid = false;
    try {
      isPasswordValid = await user.comparePassword(password);
      console.log('Password comparison result:', isPasswordValid);
    } catch (passwordError) {
      console.error('Error comparing passwords:', passwordError);
      return NextResponse.json(
        { error: 'Error validating password' },
        { status: 500 }
      );
    }
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Determine redirect URL based on role
    const redirectUrl = role === 'landlord' ? '/landlord/dashboard' : '/tenant/dashboard';

    console.log('Login successful, preparing response');

    // Set a cookie for authentication
    const response = NextResponse.json(
      { 
        user: userWithoutPassword,
        redirectUrl 
      },
      { status: 200 }
    );

    // Set the session cookie with more permissive settings for testing
    response.cookies.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    console.log('Response prepared with cookies');
    return response;
  } catch (error) {
    console.error('Unexpected login error:', error);
    return NextResponse.json(
      { error: 'Login failed - unexpected error' },
      { status: 500 }
    );
  }
} 