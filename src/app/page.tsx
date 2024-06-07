import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { auth } from '@/lib/auth';
import { signOut } from '@/lib/auth';
import getCurrentUser from '@/functions/getCurrentUser';

export default async function Home() {
  const user = await getCurrentUser();
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="lg" className="">
        <Link href="/authenticate">Go to Login</Link>
      </Button>
      <Button size="lg" className="">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <div className="w-3/4 break-words">{JSON.stringify(user)}</div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button size="lg" type="submit">
          Sign Out
        </Button>
      </form>
      <div>{JSON.stringify(session)}</div>
    </main>
  );
}
