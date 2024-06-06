"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password can't be smaller than 8 characters.",
  }),
});

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ isLoading, setIsLoading }: LoginFormProps) {
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...loginForm}>
      <div className="mb-4 flex flex-col items-center gap-2">
        <p className="text-2xl font-bold">Login to your account</p>
        <p className="text-sm text-muted-foreground">
          Enter you email and password to continue
        </p>
      </div>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="email"
          control={loginForm.control}
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
        <FormField
          name="password"
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="flex gap-1">
                <FormControl>
                  <Input
                    placeholder="********"
                    type={isPassword ? "text" : "password"}
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
        <Button disabled={isLoading} className="w-full" type="submit">
          Sign In with Email
        </Button>
      </form>
    </Form>
  );
}
