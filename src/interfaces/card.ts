import { IImage } from "./base";

export interface IFriend {
    _id: string;
    name: string;
    profilePic: IImage;
}

export interface IFriendShip {
    _id: string;
    friend: IFriend,
}