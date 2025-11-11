'use client';

import { gql } from '@apollo/client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Path, useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useMutation } from '@apollo/client/react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

type FieldMeta<T> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
};

export function LoginBasicForm<T extends FieldValues>({
  className,
  title,
  description,
  onSubmit,
  form,
  formFields,
  submitLabel,
  googleLabel,
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
                  <Button type="submit">{submitLabel}</Button>
                  <Button variant="outline" type="button">
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
