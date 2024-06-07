import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Loading() {
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
      <section className="mt-12 flex items-center justify-center gap-4">
        <div className="h-5 w-5 animate-spin rounded-full border-t-2"></div>
        <p>Email verification in progress</p>
      </section>
    </main>
  );
}
