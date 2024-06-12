export enum requestTypes{
    joinRoom = 'JOIN_ROOM',
    sendMessage = 'SEND_MESSAGE'
}

export type sendingMessagePayload = {
    type : requestTypes,
    message : string
}

export type receivedMessagePayload = {
    username: string
    message : string
    userID : number
}