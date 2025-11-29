'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

export function LoginBasicForm<T extends FieldValues>({
  className,
  title,
  description,
  onSubmit,
  form,
  formFields,
  submitLabel,
  googleLabel,
  isLoading,
  ...props
}: React.ComponentProps<'div'> & {
  title: string;
  description: string;
  onSubmit: (values: T) => void;
  form: UseFormReturn<T>;
  formFields: {
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    description?: string;
  }[];
  submitLabel: string;
  googleLabel: string;
  isLoading: boolean;
}) {
  const handleGoogleLogin = () => {
    // Redirige al endpoint de Google OAuth en tu backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {formFields.map((fieldMeta) => (
                  <FormField
                    key={fieldMeta.name}
                    control={form.control}
                    name={fieldMeta.name}
                    render={({ field: controllerField }) => (
                      <FormItem>
                        <FormLabel>{fieldMeta.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={fieldMeta.placeholder} type={fieldMeta.type} {...controllerField} />
                        </FormControl>
                        {fieldMeta.description && <FormDescription>{fieldMeta.description}</FormDescription>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Field>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {!isLoading && submitLabel}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                    className="w-full"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    {googleLabel}
                  </Button>

                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{' '}
                    <a href="/signup" className="underline underline-offset-4 hover:text-primary">
                      Sign up
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
