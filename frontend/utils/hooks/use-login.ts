import { loginUser } from '../../gateway';
import { setToken } from '../tokens';

interface LoginData {
  userName: string;
  password: string;
}

export const useLogin = (): {
  login: (values: LoginData) => Promise<{ error: any }>;
} => {
  const login = async ({ userName, password }: LoginData) => {
    const { key, error } = await loginUser({ userName, password });
    console.log('Found user', key);

    if (key != null) {
      setToken({ userKey: key, userName });
    }
    return { error };
  };

  return { login };
};
