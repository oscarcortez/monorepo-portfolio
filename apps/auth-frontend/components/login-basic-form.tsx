'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
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
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {!isLoading && submitLabel}
                  </Button>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    {googleLabel}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account? <a href="#">Sign up</a>
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
