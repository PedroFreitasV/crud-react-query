import React, { useState } from 'react';
import { useUsers, useAddUser, useDeleteUser } from '../hooks/useUsers';
import '../index.css';

export const UserList: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();
  const addUser = useAddUser();
  const deleteUser = useDeleteUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser.mutate({ name, email });
    setName('');
    setEmail('');
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div className="container">
      <h1>User List</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} ({user.email})
            </span>
            <button onClick={() => deleteUser.mutate(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
