/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useLayoutEffect, type RefObject } from "react"
import type { IMessage } from "@/interfaces/message"


/**
 * Hook to handle scroll position when loading older messages
 */
export const usePaginationScroll = ( scrollContainerRef: RefObject<HTMLDivElement | null>, messagesData: any, setMessages: (updater: (prev: IMessage[]) => IMessage[]) => void,) => {
    
    useLayoutEffect(() => {
      if (!scrollContainerRef.current || !messagesData) return
  
      const container = scrollContainerRef.current
      const prevScrollHeight = container.scrollHeight
  
      const newMessages = messagesData.pages[messagesData.pages.length - 1].results
  
      setMessages((prev) => {
        const existingIds = new Set(prev.map((msg) => msg._id))
        const uniqueNewMessages = newMessages.filter((msg: IMessage) => !existingIds.has(msg._id))
        return [...prev, ...uniqueNewMessages]
      })
  
      // Maintain scroll position after adding new messages
      requestAnimationFrame(() => {
        const newScrollHeight = container.scrollHeight
        const scrollDiff = newScrollHeight - prevScrollHeight
        container.scrollTop += scrollDiff
      })
    }, [messagesData, scrollContainerRef, setMessages])
  }
  