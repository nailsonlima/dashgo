import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
      per_page: 10,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return {
    users,
    totalCount,
  };
}

export function useUsers(page: number, options?: UseQueryOptions<GetUsersResponse>) {
  return useQuery<GetUsersResponse>({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
    staleTime: 1000 * 60 * 10,
    ...options,
  });
}
