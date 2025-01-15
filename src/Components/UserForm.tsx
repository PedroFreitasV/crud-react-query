import React, { useState } from 'react';
import { useAddUser } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const addUserMutation = useAddUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUserMutation.mutate(
      { name, email },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  return (
    <div className="user-form">
      <h1 className="title">New User</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button" disabled={addUserMutation.isLoading}>
          {addUserMutation.isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
      {addUserMutation.isError && <p className="error-message">Error: Unable to create user.</p>}
    </div>
  );
}

export default UserForm;
