import { ModeToggle } from "@/components/mode-toggler";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="lg" className="">
        <Link href="/authenticate">Go to Login</Link>
      </Button>
    </main>
  );
}
