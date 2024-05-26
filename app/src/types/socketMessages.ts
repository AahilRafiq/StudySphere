export enum requestTypes{
    joinRoom = 'JOIN_ROOM',
    sendMessage = 'SEND_MESSAGE'
}

export type messagePayload = {
    type : requestTypes,
    message : string
}