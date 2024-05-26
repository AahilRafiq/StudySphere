import { useState , useEffect } from "react";

export function useSocket() {
    const [socket , setSocket] = useState<WebSocket>()

    useEffect(()=> {
        const params = new URLSearchParams({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MTY2MjMyNzZ9.6m3eBIZBB6GOwaUfHPc-6dHltX4goIbKfCpxmAe1m8E"
        })
        const newSocket = new WebSocket(`ws://localhost:8080?${params.toString()}`)
        newSocket.onopen =  () => setSocket(newSocket)
        return (() => {
            if(socket && socket.readyState === WebSocket.OPEN) socket.close()
        })
    },[])

    const isConnected = (socket:WebSocket):boolean => {
        return (socket && socket.readyState === WebSocket.OPEN)
    } 

    return {socket , isConnected}
}