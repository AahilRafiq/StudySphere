export enum reqTypes{
    joinRoom = 'JOIN_ROOM',
    sendMessage = 'SEND_MESSAGE',
}

export type request = {
    type : reqTypes,
    username?: string,
    message: string,
    userID?: number
}