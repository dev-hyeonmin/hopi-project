import {usePost} from '@/utils/reactQuery.ts';
import {api} from '@/utils/api.ts';
import {authProps} from './type.ts';

export const login = (branch: string) => {
  return usePost(`login?branch=${branch}`, {}, () => {}, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
};

/**
 * 토큰 갱신
 */
export const reAuthToken = async (refreshToken: string) => {
  return await api.post<authProps>(
    `refresh?branch=${import.meta.env.VITE_BRANCH}`,
    {refresh_token: refreshToken},
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
  );
};
