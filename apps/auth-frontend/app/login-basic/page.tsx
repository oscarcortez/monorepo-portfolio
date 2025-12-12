'use client';

import { use } from 'react';
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
import { useSignIn } from '@/app/hooks/useAuth';

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

// const fetchSignIn = async (variables: { email: string; password: string }) => {
//   const response = await fetch('http://localhost:4000/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(variables),
//     credentials: 'include',
//   });

//   const result = await response.json();
//   if (result.errors) {
//     throw new Error(result.errors.map((err: any) => err.message).join(', '));
//   }
//   return result.data as SignInMutation;
// };

export default function Page() {
  const router = useRouter();
  const { mutate: signIn, isPending, error } = useSignIn();
  // const [signIn, { loading, error, data }] = useMutation<SignInMutation>(SIGNIN_MUTATION);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    console.log({ values });
    signIn(values, {
      onSuccess: (data) => {
        console.log('✅ Login successful, received auth code (expires in 60s)');
        const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3020';
        // Redirigir a admin-frontend con el código temporal (OAuth Authorization Code Flow)
        window.location.href = `${adminUrl}/auth/callback?code=${data.code}`;
      },
      onError: (err) => {
        console.error('❌ Error signing in:', err);
      },
    });
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
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
