import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../services/api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useUsers = () => {
  return useQuery<User[]>(['users'], async () => {
    const { data } = await api.get('/users');
    return data;
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newUser: Omit<User, 'id'>) => {
      const { data } = await api.post('/users', newUser);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      await api.delete(`/users/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};
