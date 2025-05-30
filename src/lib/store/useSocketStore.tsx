/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client"
import { create } from "zustand"

const socket = io(process.env.NEXT_PUBLIC_ONLINE_API, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
})

console.log("Socket URL:", process.env.NEXT_PUBLIC_ONLINE_API)

interface UserProfileState {
  socket: typeof socket
  isConnected: boolean
  connectionError: string | null
  disconnect: () => void
  connect: () => void
  joinRoom: (room: string) => void
  leaveRoom: (room: string) => void
  on: (event: string, callback: (...args: any[]) => void) => void
  off: (event: string, callback: (...args: any[]) => void) => void
}

export const useSocketStore = create<UserProfileState>((set, get) => {
  // Set up socket event listeners
  socket.on("connect", () => {
    console.log("✅ Socket connected successfully")
    set({ isConnected: true, connectionError: null })
  })

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason)
    set({ isConnected: false })
  })

  socket.on("connect_error", (error) => {
    console.error("🚫 Socket connection error:", error)
    set({
      isConnected: false,
      connectionError: error.message || "Connection failed",
    })
  })

  return {
    socket: socket,
    isConnected: false,
    connectionError: null,

    connect: () => {
      const { isConnected } = get()
      console.log("Attempting to connect. Current status:", isConnected)

      if (!isConnected) {
        // Clear any previous error
        set({ connectionError: null })
        socket.connect()
        // Don't set isConnected here - let the event handler do it
      }
    },

    disconnect: () => {
      const { isConnected } = get()
      if (isConnected) {
        socket.disconnect()
        // Don't set isConnected here - let the event handler do it
      }
    },

    joinRoom: (roomName: string) => {
      const { socket, isConnected, connect } = get()
      if (!isConnected) {
        console.log("Not connected, attempting to connect first...")
        connect()
        // Wait for connection before joining room
        socket.once("connect", () => {
          socket.emit("join-room", roomName)
        })
      } else {
        socket.emit("join-room", roomName)
      }
    },

    leaveRoom: (roomName: string) => {
      const { socket, isConnected } = get()
      if (isConnected) {
        socket.emit("leave-room", roomName)
      }
    },

    on: (event: string, callback) => {
      const { socket } = get()
      socket.on(event, callback)
    },

    off: (event: string, callback) => {
      const { socket } = get()
      socket.off(event, callback)
    },
  }
})
