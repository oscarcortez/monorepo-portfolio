import { useMutation } from '@tanstack/react-query';

interface SignInVariables {
  email: string;
  password: string;
}

interface SignInResponse {
  code: string;
  expires_in: number;
}

const signIn = async (variables: SignInVariables): Promise<SignInResponse> => {
  const response = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variables),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  return response.json();
};

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
