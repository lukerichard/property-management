import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="admin-link">
        <Link href="/login/admin">
          Admin Login
        </Link>
      </div>

      <div className="login-card">
        <h1 className="login-title">
          Choose Your Role
        </h1>

        <div className="role-grid">
          <Link href="/login/landlord" className="role-card">
            <div className="role-content">
              <div className="role-icon">🏘️</div>
              <h2>Landlord</h2>
              <p>
                Manage your properties, tenants, and rental agreements in one place
              </p>
            </div>
            <div className="role-indicator"></div>
          </Link>

          <Link href="/login/tenant" className="role-card">
            <div className="role-content">
              <div className="role-icon">🏠</div>
              <h2>Tenant</h2>
              <p>
                Access your rental information, make payments, and submit maintenance requests
              </p>
            </div>
            <div className="role-indicator"></div>
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