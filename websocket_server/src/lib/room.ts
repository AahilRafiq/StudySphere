import WebSocket from "ws";
import { resTypes , errorTypes , response } from "../types/outgoingMessages";

export class UserManager {

    rooms:Map<string,WebSocket[]>
    users:Map<WebSocket,string>

    constructor() {
        this.rooms = new Map<string,WebSocket[]>;
        this.users = new Map<WebSocket,string>;
    }

    /* Join a room , create one if doesnt exist */ 
    joinRoom(socket : WebSocket , roomID : string) {
        let room = this.rooms , usersMap = this.users
        if(!room.has(roomID)) room.set(roomID , [])
        room.get(roomID)?.push(socket)
        usersMap.set(socket , roomID)
    }

    /* Send Message to all users in room , exclude self */ 
    emit(socket : WebSocket , message : string) {
        let room = this.rooms , usersMap = this.users
        let messagePayload:response

        /* Check if present in a room */ 
        if(!usersMap.has(socket)) {
            messagePayload = {
                type : resTypes.error,
                error: errorTypes.notInRoom
            }
            socket.send(JSON.stringify(messagePayload))
            return
        }

        /* Broadcast the message */
        const currRoom = usersMap.get(socket);
        const users = room.get(currRoom);
        users.forEach(user => {
            if (user === socket) return
            const payload: response = {
                type: resTypes.message,
                message
            };
            user.send(JSON.stringify(payload));
        });
    }

    /* Remove a user from the Data structure on Disconnect */ 
    removeUser(socket : WebSocket) {
        const currRoom = this.users.get(socket)
        this.rooms.get(currRoom).filter(user => user !== socket)
        this.users.delete(socket)
    }
}

