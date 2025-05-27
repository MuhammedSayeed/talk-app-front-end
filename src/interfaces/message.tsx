export interface IMessage {
    _id: string;
    content: string;
    sender: string;
    chat: string;
    createdAt: string;
    type: "text" | "image";
    isRead : boolean
}

export interface TextMessage {
    type: "text";
    chat: string;
    content: string;
}

export interface ImageMessage {
    type: "image";
    chat: string;
    file: File;
}