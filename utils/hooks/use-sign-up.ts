import { signupUser } from '../../gateway';
import { setToken } from '../tokens';

interface SignUpData {
  userName: string;
  password: string;
}

export const useSignUp = (): {
  signUp: (values: SignUpData) => Promise<{ error: any }>;
} => {
  const signUp = async ({ userName, password }: SignUpData) => {
    const { _id, error } = await signupUser({ userName, password });
    if (_id != null) {
      setToken({ userKey: _id, userName });
    }
    return { error };
  };

  return { signUp };
};
