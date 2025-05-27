"use client"
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import useSearchModalStore from "@/lib/store/SearchModalStore";
import dynamic from "next/dynamic";
const SearchModal = dynamic(() => import('@/components/search/SearchModal'), { ssr: false });


const SearchIcon = () => {
    const {toggleModal} = useSearchModalStore();

    return <>
        <SearchModal />
        <Button onClick={toggleModal} variant={"outline"} className="text-white/50 hover:text-white size-12 flex gap-2 justify-center items-center rounded-full cursor-pointer md:size-auto md:px-4">
            <Search className="size-5"/>
            <span className="hidden md:block text-base font-normal ">
                Search for users
            </span>
        </Button>
    </>
}

export default SearchIcon