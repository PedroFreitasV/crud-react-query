import React, { useState } from 'react';
import { useUsers, useAddUser, useDeleteUser } from '../hooks/useUsers';
import '../index.css';
import './styles.css';

// Ajuste o tipo para refletir o que o backend retorna
type User = {
  id: number; // Alterado para 'number' conforme o erro apontado
  name: string;
  email: string;
};

export const UserList: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();
  const addUser = useAddUser();
  const deleteUser = useDeleteUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      addUser.mutate(
        { name, email },
        {
          onSuccess: () => {
            setName('');
            setEmail('');
            setMessageType('success');
            setMessage('Usuário adicionado com sucesso!');
          },
          onError: () => {
            setMessageType('error');
            setMessage('Falha ao adicionar usuário.');
          },
        }
      );
    } else {
      setMessageType('error');
      setMessage('Por favor, preencha o nome e o email.');
    }
  };

  const handleDeleteUser = (id: number) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        setMessageType('success');
        setMessage('Usuário removido com sucesso!');
      },
      onError: () => {
        setMessageType('error');
        setMessage('Falha ao remover usuário.');
      },
    });
  };

  const clearMessage = () => {
    setMessage('');
    setMessageType('');
  };

  if (isLoading) return <p>Carregando usuários...</p>;
  if (isError) return <p>Erro ao carregar usuários.</p>;

  return (
    <div className="container">
      <h1>Lista de Usuários</h1>

      {message && (
        <div className={`message ${messageType}`} onClick={clearMessage}>
          {message}
        </div>
      )}

      <ul className="user-list">
        {users?.map((user: User) => (
          <li key={user.id} className="user-item">
            <span>
              {user.name} ({user.email})
            </span>
            <button
              onClick={() => handleDeleteUser(user.id)} // Agora 'id' é do tipo correto
              disabled={deleteUser.isLoading}
              className="delete-button"
            >
              {deleteUser.isLoading ? 'Removendo...' : 'Remover'}
            </button>
          </li>
        ))}
      </ul>

      <h2>Adicionar Usuário</h2>
      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <button type="submit" className="add-button" disabled={addUser.isLoading}>
          {addUser.isLoading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

