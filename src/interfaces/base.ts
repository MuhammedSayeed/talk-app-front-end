export interface IImage {
    src: string;
    public_id: string;
}

export interface IBaseUser {
    _id: string;
    username: string;
    name: string;
    email: string;
    profilePic: IImage;
    coverPic: IImage;
    bio: string;
    createdAt : string;
}