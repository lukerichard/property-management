'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2 className="login-title">
            Welcome to Minuet
          </h2>
          <p className="login-subtitle">
            Choose your role to get started
          </p>
        </div>

        <div className="role-grid">
          <Link href="/login/landlord" className="role-card">
            <div className="role-content">
              <div className="role-icon">🏘️</div>
              <h3>I'm a Landlord</h3>
              <p>
                Manage your properties, handle tenant applications, and streamline your rental business
              </p>
            </div>
          </Link>

          <Link href="/login/tenant" className="role-card">
            <div className="role-content">
              <div className="role-icon">🏠</div>
              <h3>I'm a Tenant</h3>
              <p>
                Find your perfect home, manage your lease, and handle maintenance requests
              </p>
            </div>
          </Link>
        </div>

        <div className="back-link">
          <Link href="/">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 