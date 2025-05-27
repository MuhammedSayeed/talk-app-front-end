"use client"

import { useEffect, useCallback } from "react"
import { useSocketStore } from "@/lib/store/useSocketStore"
import { IUserStatus } from "@/interfaces/status"

/**
 * Hook to listen for friend status updates via socket
 */
export const useFriendStatusSocket = (
    friendId: string | undefined,
    onFriendStatus: (data: IUserStatus) => void,
  ) => {
    const { on, off, joinRoom, leaveRoom } = useSocketStore()
  
    const handleFriendStatus = useCallback(
      (data: IUserStatus) => {
        onFriendStatus(data)
      },
      [onFriendStatus],
    )
  
    useEffect(() => {
      if (!friendId) return
      joinRoom(`status-${friendId}`)
      on("friend-status", handleFriendStatus)
      return () => {
        off("friend-status", handleFriendStatus)
        leaveRoom(`status-${friendId}`)
      }
    }, [friendId, handleFriendStatus, joinRoom, leaveRoom, on, off])
  }