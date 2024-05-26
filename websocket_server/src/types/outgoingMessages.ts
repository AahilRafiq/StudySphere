export enum resTypes {
    message = 'MESSAGE',
    error = 'ERROR'
}

export enum errorTypes {
    notInRoom = 'NOT_IN_ROOM'
}

export type response = {
    type : resTypes,
    message? : string,
    error? : errorTypes
}