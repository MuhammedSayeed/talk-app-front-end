

export interface ICreatedChat {
    name: string,
    profilePic: string,
    _id: string,
}

export interface IBlockUserEvent {
    blockStatus: boolean,
    blockInfo: {
        _id: string,
        blocker: string,
        blocked: string
    }
}