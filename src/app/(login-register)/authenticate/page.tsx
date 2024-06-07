import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import authImage from "#/authenticate-page.svg";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Authentication - Colhive",
};

export default function Page() {
  return (
    <main className="h-screen w-screen grid-cols-2 lg:grid">
      <section className="relative hidden bg-accent lg:grid lg:place-content-center">
        <article id="logo" className="absolute left-0 top-0">
          <p className="p-5 font-extrabold lg:text-4xl">Colhive</p>
        </article>
        <article className="relative h-[40vw] w-[40vw]">
          <Image
            src={authImage}
            alt=""
            draggable={false}
            fill
            priority
            className="object-contain"
          />
        </article>
      </section>
      <section className="relative flex h-full items-center justify-center bg-background">
        <article className="absolute top-0 flex w-full items-center justify-between lg:right-4 lg:top-4">
          <div>
            <p className="m-5 text-2xl font-extrabold lg:hidden">Colhive</p>
          </div>
          <div className="flex gap-5 pr-5 lg:pr-0">
            <Button variant="ghost" className="">
              <Link href="/">Home</Link>
            </Button>
            <ModeToggle />
          </div>
        </article>
        <AuthForm />
      </section>
    </main>
  );
}
