import React, { useState, useEffect } from 'react';

const CheckUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/auth/users');
        const data = await res.json();
        if (!res.ok) {
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Existing Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginTop: '20px' }}>
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
      </div>
    </div>
  );
};

export default CheckUsers;
