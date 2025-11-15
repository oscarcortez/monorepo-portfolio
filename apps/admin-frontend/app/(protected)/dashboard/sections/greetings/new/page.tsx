'use client';

import type { BreadcrumbItem } from '@/stores/breadcrumb-store';
import { useBreadcrumb } from '@/hooks/use-breadcrumb';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const heroGreetingFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.').max(255, 'Title must be at most 255 characters.'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters.')
    .max(1000, 'Content must be at most 1000 characters.'),
  footer: z.string().min(3, 'Footer must be at least 3 characters.').max(255, 'Footer must be at most 255 characters.'),
  language: z
    .enum(['ES', 'EN', 'FR', 'PT'])
    .refine((val) => ['ES', 'EN', 'FR', 'PT'].includes(val), 'Please select a valid language.'),
  device: z
    .enum(['MOBILE', 'DESKTOP', 'TABLET', 'TV', 'OTHER'])
    .refine((val) => ['MOBILE', 'DESKTOP', 'TABLET', 'TV', 'OTHER'].includes(val), 'Please select a valid device.'),
});

export type HeroGreetingFormValues = z.infer<typeof heroGreetingFormSchema>;

const LANGUAGES = [
  { value: 'ES', label: 'Español' },
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'Français' },
  { value: 'PT', label: 'Português' },
];

const DEVICES = [
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'DESKTOP', label: 'Desktop' },
  { value: 'TABLET', label: 'Tablet' },
  { value: 'TV', label: 'TV' },
  { value: 'OTHER', label: 'Other' },
];

export default function Page() {
  useBreadcrumb([
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Sections', href: '/dashboard/sections' },
    { label: 'Greetings', href: '/dashboard/sections/greetings' },
    { label: 'New' },
  ] as BreadcrumbItem[]);

  const form = useForm<HeroGreetingFormValues>({
    resolver: zodResolver(heroGreetingFormSchema),
    defaultValues: {
      title: '',
      content: '',
      footer: '',
      language: 'EN',
      device: 'DESKTOP',
    },
  });

  function onSubmit(data: z.infer<typeof heroGreetingFormSchema>) {
    console.log('Form submitted:', data);
    toast('You submitted the following values:', {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-2 pt-0">
        <Card className="w-full sm:max-w-2xl">
          <CardHeader>
            <CardTitle>Create Hero Greeting</CardTitle>
            <CardDescription>Add a new hero greeting message for your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="hero-greeting-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Title */}
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hero-greeting-title">Title</FieldLabel>
                      <Input
                        {...field}
                        id="hero-greeting-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Welcome to my portfolio"
                        autoComplete="off"
                      />
                      <FieldDescription>The main title of your hero section</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Content */}
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hero-greeting-content">Content</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="hero-greeting-content"
                          placeholder="Share your story, skills, or message..."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">{field.value.length}/1000</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>The main content of your hero greeting</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Footer */}
                <Controller
                  name="footer"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hero-greeting-footer">Footer</FieldLabel>
                      <Input
                        {...field}
                        id="hero-greeting-footer"
                        aria-invalid={fieldState.invalid}
                        placeholder="Let's build something great together"
                        autoComplete="off"
                      />
                      <FieldDescription>Footer text for your hero section</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Language */}
                <Controller
                  name="language"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hero-greeting-language">Language</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="hero-greeting-language" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>The language of this greeting</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Device */}
                <Controller
                  name="device"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hero-greeting-device">Device</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="hero-greeting-device" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select a device" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEVICES.map((device) => (
                            <SelectItem key={device.value} value={device.value}>
                              {device.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>Target device for this greeting</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form="hero-greeting-form">
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
