'use client';

import { LoginBasicForm } from '@/components/login-basic-form';
import { SIGNIN_MUTATION } from './graphql';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useMutation } from '@apollo/client/react';
import { SubmitHandler } from 'react-hook-form';
import { FieldMeta } from '@/types/field-meta';
// SignInMutation
import type { SignInMutation } from '../graphql/generated/graphql-types';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const formFields: FieldMeta<LoginFormValues>[] = [
  { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
  { name: 'password', label: 'Password', placeholder: '••••••', type: 'password' },
];

const actions = {
  submitLabel: 'Login',
  googleLabel: 'Login with Google',
};

export default function Page() {
  const router = useRouter();
  const [signIn, { loading, error, data }] = useMutation<SignInMutation>(SIGNIN_MUTATION);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    console.log({ values });
    try {
      const result = await signIn({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      console.log('Access token:', result.data?.signIn.access_token);
      if (result.data?.signIn.access_token) {
        localStorage.setItem('auth_token', result.data.signIn.access_token);
        localStorage.setItem('user_email', values.email);

        const syncAdmin = fetch('http://localhost:3020/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: result.data.signIn.access_token }),
        });

        // 3. Sincronizar con viz-frontend (puerto 3000)
        const syncViz = fetch('http://localhost:3000/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: result.data.signIn.access_token }),
        });

        try {
          await Promise.all([syncAdmin, syncViz]);
          console.log('Token synced successfully with all apps');
        } catch (syncError) {
          console.error('Error syncing token:', syncError);
        }
        window.location.href = 'http://localhost:3000/viz';
      }
    } catch (err) {
      console.error('Error signing in:', err);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginBasicForm
          title="VIZ - Visualize Yourself"
          description="Enter your email below to login to your account"
          onSubmit={onSubmit as unknown as any}
          form={form}
          formFields={formFields}
          submitLabel={actions.submitLabel}
          googleLabel={actions.googleLabel}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
