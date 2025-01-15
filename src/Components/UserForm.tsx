import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const createUser = async (user: { name: string; email: string }) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', user);
  return { ...user, id: data.id || Date.now() }; // Adiciona um ID falso se a API não retornar um.
};

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(createUser, {
    onSuccess: (newUser) => {
      queryClient.setQueryData('users', (old: any) => [...(old || []), newUser]); // Adiciona o novo usuário ao cache.
      navigate('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email });
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
        <button type="submit" className="form-button" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
      {mutation.isError && <p className="error-message">Error: Unable to create user.</p>}
    </div>
  );
}

export default UserForm;
