"use client"
import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getFromLocalStorage } = useLocalStorage()

  useEffect(() => {
    const syncToken = () => {
      const newToken = getFromLocalStorage("token")
      setToken(newToken)
      setIsLoading(false)
    }

    // Run immediately on mount
    syncToken()

    // Listen for storage changes
    window.addEventListener("storage", syncToken)

    // Custom event for same-tab updates
    window.addEventListener("tokenUpdated", syncToken)

    return () => {
      window.removeEventListener("storage", syncToken)
      window.removeEventListener("tokenUpdated", syncToken)
    }
  }, [getFromLocalStorage])

  const updateToken = (newToken: string | null) => {
    setToken(newToken)
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("tokenUpdated"))
  }

  return {
    token,
    isLoading,
    updateToken,
  }
}

export default useToken
