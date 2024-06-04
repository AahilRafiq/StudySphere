"use client";
import { useState } from "react";
import SignUp from "@/lib/auth/signUp";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass,setConfirmPass] = useState("")
  const [error, setError] = useState("");

  async function handleSignUp() {

    if(password !== confirmPass) {
        setError("Passwords dont match!")
        return
    }

    const res = await SignUp(username,email, password,confirmPass);

    if(res.status === 401) {
        setError("Enter correct credentials , make sure passwords match and has more than 5 characters")
        return
    }

    if (res.status === 409) {
      setError("User already Exists!");
      return;
    }

    router.push("/home");
  }

  return (
    <>
      <div className="flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-[28rem]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create New Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your username , email and password below to create a new account
            </p>
            <p className=" text-red-500">{error}</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                type="email"
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
            <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                onChange={(e) => setConfirmPass(e.target.value)}
                id="password"
                required
                type="password"
              />
            </div>
            <Button onClick={handleSignUp} className="w-full">Sign Up</Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?
            <Link className="underline" href="/auth/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
