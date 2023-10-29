export type userInformation={
    id?:string,
    displayName: string,
    email :string,
    profileImage?:string
}

export type message={
    type:string,
    content:string,
    sender?:string,
    reciver?:string
}

export type friend ={
    friendId:string,
    displayName:string
}