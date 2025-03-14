import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecuredData = async () => {
      try {
        // Example of accessing a secured endpoint
        const response = await api.get('/groups');
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load secure data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSecuredData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading secure data...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to the Secured Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <div className="dashboard-content">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="user-data">
            <h3>Secured Data:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;