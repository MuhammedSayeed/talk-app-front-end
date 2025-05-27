import { IBaseUser } from "./base";

export interface IUser extends IBaseUser  {
    verified : boolean;
    provider : "credentials" | "google" | "github";
    passwordChangedAt : Date;
    emailChangedAt : Date;
}



