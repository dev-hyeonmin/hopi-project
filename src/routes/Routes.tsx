import LoginRoutes from './LoginRoutes.tsx';
import LogoutRoutes from './LogoutRoutes.tsx';
import {getAuthToken} from '../utils/auth.ts';

export const Routes = () => {
  const token = getAuthToken();

  if (token) {
    return <LoginRoutes />;
  }

  return <LogoutRoutes />;
};
