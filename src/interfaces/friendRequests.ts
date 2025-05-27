import { IImage } from "./base";

export interface ISender {
    _id: string;
    name: string;
    profilePic: IImage;
}

export interface IFRIEND_REQUEST_NOTIFICATION {
    _id: string,
    sender: ISender,
    receiver: string;
}