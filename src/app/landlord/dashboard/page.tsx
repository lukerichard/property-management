'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Property {
  _id: string;
  address: string;
  status: string;
  tenants: number;
}

export default function LandlordDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For now, we'll use mock data
    const mockProperties: Property[] = [
      {
        _id: '1',
        address: '123 Main St, Anytown, USA',
        status: 'Occupied',
        tenants: 2
      },
      {
        _id: '2',
        address: '456 Oak Ave, Somewhere, USA',
        status: 'Vacant',
        tenants: 0
      }
    ];

    setProperties(mockProperties);
    setLoading(false);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Landlord Dashboard</h1>
        <button 
          className="button"
          onClick={() => router.push('/landlord/properties/new')}
        >
          Add New Property
        </button>
      </header>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Properties</h3>
            <p className="stat-number">{properties.length}</p>
          </div>
          <div className="stat-card">
            <h3>Occupied Properties</h3>
            <p className="stat-number">
              {properties.filter(p => p.status === 'Occupied').length}
            </p>
          </div>
          <div className="stat-card">
            <h3>Total Tenants</h3>
            <p className="stat-number">
              {properties.reduce((sum, p) => sum + p.tenants, 0)}
            </p>
          </div>
        </div>

        <div className="properties-section">
          <h2>Your Properties</h2>
          {loading ? (
            <p>Loading properties...</p>
          ) : (
            <div className="properties-grid">
              {properties.map(property => (
                <div key={property._id} className="property-card">
                  <h3>{property.address}</h3>
                  <div className="property-details">
                    <p>Status: <span className={`status-badge ${property.status.toLowerCase()}`}>
                      {property.status}
                    </span></p>
                    <p>Tenants: {property.tenants}</p>
                  </div>
                  <button 
                    className="button button-outline"
                    onClick={() => router.push(`/landlord/properties/${property._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 