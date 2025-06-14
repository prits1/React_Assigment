import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div>
        <h2>No data submitted.</h2>
        <button onClick={() => navigate('/')}>Back to Form</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Submission Successful 🎉</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => {
          if (key === 'showPassword') return null;
          return <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</li>;
        })}
      </ul>
      <button onClick={() => navigate('/')}>Back to Form</button>
    </div>
  );
}
