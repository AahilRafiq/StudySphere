import { useState } from "react";

export function useSocket(token:string) {
    const [socket , setSocket] = useState<WebSocket>()

    const connect = (token:string) => {
        const params = new URLSearchParams({
            token: token
        })
        const newSocket = new WebSocket(`ws://${process.env.WEBSOCKET_SERVER_URL}?${params.toString()}`)
        newSocket.onopen =  () => setSocket(newSocket)
    }

    const isConnected = (socket:WebSocket):boolean => {
        return (socket && socket.readyState === WebSocket.OPEN)
    } 

    return {socket ,connect, isConnected}
}