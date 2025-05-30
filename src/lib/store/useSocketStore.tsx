/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";
import { create } from "zustand";

const socket = io(process.env.NEXT_PUBLIC_ONLINE_API, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false
});

interface UserProfileState {
    socket: typeof socket;
    isConnected: boolean;
    disconnect: () => void;
    connect: () => void;
    joinRoom: (room: string) => void;
    leaveRoom: (room: string) => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback: (...args: any[]) => void) => void;

}
export const useSocketStore = create<UserProfileState>((set, get) => ({
    socket: socket,
    isConnected: false,

    connect: () => {
        const { isConnected, socket } = get();
        console.log("is connected" , isConnected);
        
        if (!isConnected) {
            socket.connect();
            set({ isConnected: true });
        }
    },

    disconnect: () => {
        const { isConnected, socket } = get();
        if (isConnected) {
            socket.disconnect();
            set({ isConnected: false });
        }
    },
    joinRoom: (roomName: string) => {
        const { socket, isConnected, connect } = get();
        if (!isConnected) connect();
        socket.emit("join-room", roomName)
    },
    leaveRoom: (roomName: string) => {
        const { socket, isConnected } = get();
        if (isConnected) {
            socket.emit("leave-room", roomName);
        }
    },

    on: (event: string, callback) => {
        const { socket } = get();
        socket.on(event, callback);
    },

    off: (event: string, callback) => {
        const { isConnected, socket } = get();
        if (isConnected) {
            socket.off(event, callback);
        }
    },

}))