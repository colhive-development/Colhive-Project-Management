"use client";

import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import LoginForm from "./LoginFrom";
import RegisterForm from "./RegisterForm";
import GoogleLogoIcon from "@/lib/icons/GoogleLogoIcon";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<"LOG IN" | "REGISTER">(
    "LOG IN",
  );

  async function onSubmit() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <section className="flex w-[28rem] max-w-[80%] flex-col gap-4">
      {currentPage === "LOG IN" ? (
        <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
      ) : (
        <RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onSubmit}
        disabled={isLoading}
        className="bg-black text-white hover:bg-zinc-800 hover:text-white"
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
      <Button
        variant="outline"
        onClick={onSubmit}
        disabled={isLoading}
        className="bg-white text-black hover:bg-zinc-200 hover:text-black"
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2" />
        ) : (
          <GoogleLogoIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      {currentPage === "LOG IN" ? (
        <div className="text-center text-muted-foreground">
          don&apos;t have an account?{" "}
          <Button variant="link" onClick={() => setCurrentPage("REGISTER")}>
            Register
          </Button>{" "}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          already have an account?{" "}
          <Button variant="link" onClick={() => setCurrentPage("LOG IN")}>
            Login
          </Button>{" "}
        </div>
      )}
    </section>
  );
}
