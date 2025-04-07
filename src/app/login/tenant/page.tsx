'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

export default function TenantLoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: 'tenant' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to the URL provided by the API
      router.push(data.redirectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err; // Re-throw to be caught by LoginForm
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">
            Tenant Login
          </h2>
          <p className="login-subtitle">
            Or{' '}
            <Link href="/tenant/register">
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
} 