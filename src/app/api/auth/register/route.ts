import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { 
      email, 
      password, 
      role,
      firstName,
      lastName,
      phoneNumber,
      address 
    } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email, role });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user with all required fields
    const user = new User({
      email,
      password, // Let the model handle password hashing
      role,
      firstName,
      lastName,
      phoneNumber,
      address
    });

    await user.save();

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Create response
    const response = NextResponse.json(
      { 
        message: 'Registration successful', 
        user: userWithoutPassword,
        redirectUrl: role === 'landlord' ? '/landlord/dashboard' : '/tenant/dashboard'
      },
      { status: 201 }
    );

    // Set the auth cookie
    response.cookies.set('auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
} 