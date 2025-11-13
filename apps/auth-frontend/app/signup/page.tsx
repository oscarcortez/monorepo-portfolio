'use client';

import { SignupForm } from '@/components/signup-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import { email, z } from 'zod';
import { FieldMeta } from '@/types/field-meta';
import { CREATE_USER_MUTATION } from './graphql';
import { useMutation } from '@apollo/client/react';

const signupSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const formFields: FieldMeta<SignupFormValues>[] = [
  { name: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
  {
    name: 'email',
    label: 'Email7',
    placeholder: 'you@example.com',
    type: 'email',
    description: "We'll use this to contact you. We will not share your email with anyone else.",
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: '••••••',
    type: 'password',
    description: 'Must be at least 8 characters long.',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: '••••••',
    type: 'password',
    description: 'Please confirm your password.',
  },
];

export default function Page() {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (values) => {
    console.log({ values });
    try {
      const result = await createUser({
        variables: {
          data: {
            email: values.email,
            name: values.name,
            passwordHash: values.password,
          },
        },
      });

      console.log('Created User:', result.data);
      // TODO: redirect to login or dashboard
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm
          title="Create Account"
          description="Sign up to get started"
          form={form}
          formFields={formFields}
          onSubmit={onSubmit as unknown as any}
          submitLabel="Sign Up"
          googleLabel="Sign up with Google"
        />
      </div>
    </div>
  );
}
