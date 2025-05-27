import { IImage } from "./base";

export interface IChatUser {
    _id: string;
    name: string;
    username: string;
    email: string;
    isOnline: boolean;
    lastSeen: string | null;
    profilePic: IImage;
    coverPic: IImage;
}

export interface ILastMessage {
    _id: string,
    sender: string,
    content: string,
    createdAt: string,
    type : "image" | "text",
    isRead : boolean
}

export interface IChat {
    _id: string;
    users: IChatUser[],
    lastMessage: ILastMessage;
    createdAt: string,
}