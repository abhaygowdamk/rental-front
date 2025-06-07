import React, { useState, useEffect } from 'react';

const UsernameEmailCheck = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkUser = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (username) params.append('username', username);
      if (email) params.append('email', email);
      
      const response = await fetch(`/api/auth/check-user?${params.toString()}`);
      const data = await response.json();
      setCheckResult(data);
    } catch (error) {
      setCheckResult({ error: 'Failed to check user' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Check Username/Email Availability</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button
          onClick={checkUser}
          disabled={loading}
          style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Check
        </button>
      </div>

      {loading && <p>Checking...</p>}
      {checkResult && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
          {checkResult.error ? (
            <p style={{ color: 'red' }}>{checkResult.error}</p>
          ) : checkResult.exists ? (
            <div>
              <p style={{ color: 'red' }}>User already exists:</p>
              <p>Username: {checkResult.user.username}</p>
              <p>Email: {checkResult.user.email}</p>
              <p>User ID: {checkResult.user.userId}</p>
            </div>
          ) : (
            <p style={{ color: 'green' }}>Username and email are available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsernameEmailCheck;
