export type userInformation={
    id?:string,
    displayName: string,
    email :string,
    profileImage?:string
}

export type message={
    type:string,
    content:string|ArrayBuffer,
    fileName?:string,
    sender?:string,
    reciever?:string
}

export type friendRequest={
    type:"friendRequest",
    userId:string,
    friendEmail:string
}

export type friend ={
    friendId:string,
    displayName:string
}

export type response={
    id:string,
    friends:friend[]
}

export type addFriendRequest={
    friendEmail: string,
    userId: string
}
export type bubblePlace="right"|"left";
export enum location{
    right="right",
    left="left"
}

