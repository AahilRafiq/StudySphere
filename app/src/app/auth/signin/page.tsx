"use client"
import { useState } from "react";
import SignIn from "@/lib/auth/signIn";
import { useRouter } from "next/navigation";

export default function () {

    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")
    
    async function handleSignIn() {
        const res = await SignIn(username,password)
        if(res.status === 401) {
            setError('Invalid Credentials')
            return
        }

        router.push('/home')
    }

    return (
        <div>
            <h1>Sign In</h1>
            <h3 className=" text-red-500">{error}</h3>
            <div>
                <input onChange={e=>setUsername(e.target.value)} type="text" placeholder="username" />
                <input onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </div>
    );
}