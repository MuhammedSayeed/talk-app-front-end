"use client"
import { IUser } from "@/interfaces/auth"
import { type Dispatch, type SetStateAction, createContext } from "react"

interface IAuthContext {
  isLoading: boolean
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>,
  updateUserState: <K extends keyof IUser>(key: K, value: IUser[K]) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoading: false,
  user: null,
  setUser: () => { },
  updateUserState : ()=>{}
})
