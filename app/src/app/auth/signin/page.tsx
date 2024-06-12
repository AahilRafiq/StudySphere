"use client";
import { useState } from "react";
import SignIn from "@/lib/auth/signIn";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState("");
  const [error, setError] = useState(false);
  if(error) throw new Error()

  async function handleSignIn() {
    const res = await SignIn(username, password);
    if (res.status === 401) {
      setDisplayError("Invalid Credentials");
      return;
    }

    if(res.status === 500) {
      setError(true);
      return;
    }

    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your username below to login to your account
            </p>
            <p className=" text-red-500">{displayError}</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
                type="password"
              />
            </div>
            <Button onClick={handleSignIn} className="w-full">Sign In</Button>
          </div>
          <div className="text-center text-sm">
            Don't have an account?
            <Link className="underline" href="/auth/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
