import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from './ui/form';

export function SignupForm<T extends FieldValues>({
  title,
  description,
  onSubmit,
  form,
  formFields,
  submitLabel,
  googleLabel,
  ...props
}: React.ComponentProps<typeof Card> & {
  title?: string;
  description?: string;
  onSubmit: (values: T) => void;
  form: UseFormReturn<T>;
  formFields: {
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    description?: string;
  }[];
  submitLabel?: string;
  googleLabel?: string;
}) {
  return (
    <Card {...props}>
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
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
