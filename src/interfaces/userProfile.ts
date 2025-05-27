import { IBaseUser } from "./base";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IUserInfo extends IBaseUser  {
    
}
interface IBlockDetails {
    blocker: string;
    blocked: string;
}
interface IFriendShipDetails {
    _id: string;
    friendA: string;
    friendB: string;
}
interface IPendingFriendRequest {
    _id: string;
    sender: string;
    receiver: string;
}
export interface IUserProfile {
    user: IUserInfo;
    isBlocked: boolean;
    blockDetails: IBlockDetails | null;
    isFriend: boolean;
    friendShipDetails: IFriendShipDetails | null;
    isPendingFriendRequest: boolean;
    pendingFriendRequest: IPendingFriendRequest | null;
}