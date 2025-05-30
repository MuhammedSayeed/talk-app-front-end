"use client"
import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const {getFromLocalStorage} = useLocalStorage();

  useEffect(() => {
    const syncToken = () => {
      const newToken = getFromLocalStorage("token");
      setToken(newToken);
    };

    syncToken();

    window.addEventListener("storage", syncToken);
    return () => {
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  return {
    token
  };
};

export default useToken;
