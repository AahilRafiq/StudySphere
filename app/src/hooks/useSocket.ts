import { useState , useEffect } from "react";

export function useSocket(token:string) {
    const [socket , setSocket] = useState<WebSocket>()

    useEffect(()=> {
        const params = new URLSearchParams({
            token: token
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