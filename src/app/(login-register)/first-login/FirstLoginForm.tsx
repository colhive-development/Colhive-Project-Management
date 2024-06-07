'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

const formSchema = z.object({
  organozation: z.string({
    message: 'Field is needed',
  }),
  role: z.string({
    message: 'Field is needed',
  }),
});

export default function FirstLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organozation: '',
      role: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await axios
      .post('/api/first', {
        organisation: values.organozation,
        role: values.role,
      })
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => error.response?.data);
    if (response.status === 200) {
      toast.success(response.message);
      router.push('/dashboard');
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg lg:text-2xl">
          Essential Information
        </CardTitle>
        <CardDescription>
          These infoemation are safe with us and are used for reference and user
          identification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="organozation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Abc Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Developer  Finance  ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="ml-auto flex gap-3"
              type="submit"
            >
              {isLoading && (
                <div className="ml-auto h-5 w-5 animate-spin rounded-full border-t-2"></div>
              )}
              <p>Proceed</p>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
