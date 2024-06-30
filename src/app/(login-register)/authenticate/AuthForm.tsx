'use client';

import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import LoginForm from './LoginFrom';
import RegisterForm from './RegisterForm';
import GoogleLogoIcon from '@/lib/icons/GoogleLogoIcon';

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'LOG IN' | 'REGISTER'>(
    'LOG IN',
  );

  return (
    <article className="mt-12 flex w-[28rem] max-w-[90%] flex-col gap-4 lg:mt-0">
      {currentPage === 'LOG IN' ? (
        <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
      ) : (
        <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
      )}

      {currentPage === 'LOG IN' ? (
        <div className="text-center text-muted-foreground">
          don&apos;t have an account?{' '}
          <Button variant="link" onClick={() => setCurrentPage('REGISTER')}>
            Register
          </Button>{' '}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          already have an account?{' '}
          <Button variant="link" onClick={() => setCurrentPage('LOG IN')}>
            Login
          </Button>{' '}
        </div>
      )}
    </article>
  );
}
