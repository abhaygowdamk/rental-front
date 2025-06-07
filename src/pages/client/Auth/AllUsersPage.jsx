import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/auth/all-users');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch users');
        }
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Users</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>User ID</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.userId}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Back to Signup
        </button>
      </Link>
    </div>
  );
};

export default AllUsersPage;
