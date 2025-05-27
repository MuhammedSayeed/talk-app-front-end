import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_ONLINE_API, {
    transports: ["websocket"],
    withCredentials: true, 
    autoConnect: false     
  });

export default socket;