import { IImage } from "./base";

export interface IAcceptedByUser {
    _id: string;
    name: string;
    username: string;
    profilePic: IImage;
  }

export interface INotificationCard {
    _id?: string;
    createdAt: string;
    acceptedBy: IAcceptedByUser;
}