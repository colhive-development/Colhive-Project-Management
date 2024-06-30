'use client';

import { Button } from '@/components/ui/button';
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
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const registerFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email().trim(),
    companyCode: z.string(),
    companyName: z.string(),
    password: z.string().min(8, {
      message: "Password can't be smaller than 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match.',
        path: ['confirmPassword'],
      });
    }
  });

const companyFormSchema = z
  .object({
    comName: z.string().trim(),
    yourName: z.string().trim(),
    comEmail: z.string().email(),
    comdesignation: z.string().trim(),
    compassword: z.string().min(8, {
      message: "Password can't be smaller than 8 characters.",
    }),
    comconfirmPassword: z.string(),
  })
  .superRefine(({ comconfirmPassword, compassword }, ctx) => {
    if (comconfirmPassword !== compassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match.',
        path: ['comconfirmPassword'],
      });
    }
  });

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm({
  isLoading,
  setIsLoading,
}: RegisterFormProps) {
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      companyCode: '',
      companyName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const companyRegisterForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      comName: '',
      comEmail: '',
      comdesignation: '',
      compassword: '',
      comconfirmPassword: '',
      yourName: '',
    },
  });

  async function onCompanySubmit(values: z.infer<typeof companyFormSchema>) {
    setIsLoading(true);
    const data = await axios
      .post(`/api/register/company`, {
        name: values.comName,
        email: values.comEmail,
        password: values.comconfirmPassword,
        designation: values.comdesignation,
        yourName: values.yourName,
      })
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => error.response?.data);

    if (data.status === 200) {
      toast.success(data.message, {
        description: 'Please check your Email for verification Link.',
      });
    } else {
      toast.error(data.message);
    }

    setIsLoading(false);
  }

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true);
    const data = await axios
      .post(`/api/register/individual`, {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => error.response?.data);

    if (data.status === 200) {
      toast.success(data.message, {
        description: 'Please check your Email for verification Link.',
      });
    } else {
      toast.error(data.message);
    }

    setIsLoading(false);
  }

  return (
    <Tabs defaultValue="ind">
      <div className="mb-2 flex flex-col items-center gap-2">
        <p className="text-2xl font-bold">Create a new account</p>
        <p className="text-sm text-muted-foreground">
          Enter you details below to continue
        </p>
      </div>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ind">Individual</TabsTrigger>
        <TabsTrigger value="com">Company</TabsTrigger>
      </TabsList>
      <TabsContent value="ind">
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              name="name"
              control={registerForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={registerForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                name="companyName"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ACME Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="companyCode"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Code</FormLabel>
                    <FormControl>
                      <Input placeholder="abc12589sghd5.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                name="password"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="********"
                          type={isPassword ? 'text' : 'password'}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          setIsPassword((curr) => !curr);
                        }}
                      >
                        {isPassword ? (
                          <EyeOpenIcon className="h-5 w-5" />
                        ) : (
                          <EyeClosedIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="********"
                          type={isPassword ? 'text' : 'password'}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          setIsPassword((curr) => !curr);
                        }}
                      >
                        {isPassword ? (
                          <EyeOpenIcon className="h-5 w-5" />
                        ) : (
                          <EyeClosedIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} className="w-full" type="submit">
              Register with Email
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="com">
        <Form {...companyRegisterForm}>
          <form
            onSubmit={companyRegisterForm.handleSubmit(onCompanySubmit)}
            className="space-y-2"
          >
            <FormField
              name="comName"
              control={companyRegisterForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ACME Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="comEmail"
              control={companyRegisterForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="yourName"
              control={companyRegisterForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="comdesignation"
              control={companyRegisterForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Manager/ Supervisor ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                name="compassword"
                control={companyRegisterForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="********"
                          type={isPassword ? 'text' : 'password'}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          setIsPassword((curr) => !curr);
                        }}
                      >
                        {isPassword ? (
                          <EyeOpenIcon className="h-5 w-5" />
                        ) : (
                          <EyeClosedIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="comconfirmPassword"
                control={companyRegisterForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Input
                          placeholder="********"
                          type={isPassword ? 'text' : 'password'}
                          {...field}
                        />
                      </FormControl>
                      <Button
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          setIsPassword((curr) => !curr);
                        }}
                      >
                        {isPassword ? (
                          <EyeOpenIcon className="h-5 w-5" />
                        ) : (
                          <EyeClosedIcon className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} className="w-full" type="submit">
              Register Company
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
