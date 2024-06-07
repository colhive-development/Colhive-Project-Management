'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export default async function CredentialSignIn(
  email: string,
  password: string,
) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return '{"message":"Log in Successfull","status":"200"}';
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      console.log(cause);
      switch (type) {
        case 'CallbackRouteError':
          return cause?.err?.message.toString();
        default:
          return 'Something went wrong';
      }
    }
    return 'Something went wrong';
  }
}
