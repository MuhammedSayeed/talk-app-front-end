"use client"
import { FaUserFriends } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { Input } from "../ui/input"
import Message from "../ui/messages/Message"
import { IFriendShip } from "@/interfaces/card"
import FriendCardSkeleton from "../skeleton/FriendCard"
import FriendCard from "./Card"
import useFriendsList from "@/hooks/useFriendsList"

const FriendsList = () => {
    const {friendships , lastItemRef , handleSearchChange , hasNextPage , isLoading , searchTerm} = useFriendsList();
    const RENDER_SKELETON = Array(5).fill(null).map((_, index) => <FriendCardSkeleton key={index} />)
    const RENDER_CARDS = () => {
        if (isLoading) return RENDER_SKELETON;

        if (friendships.length === 0) {
            return searchTerm ? <Message message={`No friends found for "${searchTerm}"`} /> : <Message message='No Firends yet..' />
        }
        return friendships.map(({ _id, friend }: IFriendShip, index) => {

            if (index === friendships.length - 1 && hasNextPage) {
                return <div key={_id} ref={lastItemRef}>
                    <FriendCard friend={friend} />
                </div>
            }

            return <FriendCard key={_id} friend={friend} />
        })
    }
    return (
        <div className="pt-3 grid grid-rows-[auto_1fr] space-y-3 ">
            <div className="space-y-3">
                <h1 className="text-4xl text-gray-200 font-bold flex items-center gap-2 ">
                    <span className=" h-full flex items-center mt-1">
                        <FaUserFriends size={25} className="text-gray-200" />
                    </span>Friends
                </h1>
                <div className="border border-white/20 flex items-center gap-1 pl-2 rounded-lg remove-outline bg-transparent">
                    <IoSearch className="text-white/50" size={25} />
                    <Input onChange={handleSearchChange} className="!bg-transparent py-6 px-0 border-none text-white/50 font-medium placeholder:text-white/50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Search for a chat" />
                </div>
            </div>
            <div className=" relative w-full h-full max-h-full">
                <div className="absolute inset-0 overflow-y-auto space-y-3">
                    {RENDER_CARDS()}
                </div>
            </div>
        </div>

    )
}

export default FriendsList