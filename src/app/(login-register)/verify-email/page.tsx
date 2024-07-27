import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface PageProps {
  searchParams: {
    identifier: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  let data = await axios
    .post(`/api/verify`, {
      identifier: searchParams.identifier,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      return error.response?.data;
    });

  return (
    <main className="relative grid h-screen w-screen place-content-center">
      <section className="absolute left-0 top-0">
        <article className="p-5 text-2xl font-extrabold lg:text-4xl">
          Colhive
        </article>
      </section>
      <section className="absolute right-0 top-0 p-5">
        <Button variant="ghost" className="lg:text-lg">
          <Link href="/">Home</Link>
        </Button>
      </section>
      <section className="mt-12 flex flex-col items-center gap-4">
        <article className="flex items-center justify-center gap-3">
          <p>Email verification Process completed</p>
        </article>
        <article className="flex flex-col items-center justify-center gap-2">
          {data.status !== 200 && (
            <>
              <p>Email verification Failed.</p>
              <Button>
                <Link href="/">Go to Home</Link>
              </Button>
            </>
          )}
          {data.status === 200 && (
            <>
              <p>Email verified Successfully.</p>
              <Button>
                <Link href="/authenticate">Go to Login</Link>
              </Button>
            </>
          )}
        </article>
      </section>
    </main>
  );
}
