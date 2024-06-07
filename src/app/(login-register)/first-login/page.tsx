import { ModeToggle } from '@/components/mode-toggler';
import React from 'react';
import FirstLoginForm from './FirstLoginForm';

export default function Page() {
  return (
    <main className="relative grid h-screen w-screen place-content-center">
      <section className="absolute left-0 top-0 p-5">
        <p className="text-2xl font-extrabold lg:text-4xl">Colhive</p>
      </section>
      <section className="absolute right-0 top-0 p-5">
        <ModeToggle />
      </section>
      <section className="m-auto max-w-[90%] lg:max-w-full">
        <FirstLoginForm />
      </section>
    </main>
  );
}
