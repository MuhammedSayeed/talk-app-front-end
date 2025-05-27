"use client"
import Modal from "../ui/Modal"
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useSearchModal from "@/hooks/useSearchModal";


const SearchModal = () => {

    const { isOpen, onClose, inputRef, setSearchQuery, RENDER_RESULTS } = useSearchModal();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full min-h-96 max-h-96 grid grid-rows-[50px_1fr] space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-transparent border border-primary-lighter flex items-center gap-1 pl-2 rounded-lg remove-outline">
                        <IoSearch className="text-white/50" size={25} />
                        <Input ref={inputRef} onChange={(e) => setSearchQuery(e.target.value)} className="!bg-transparent py-6 px-0 border-none text-white/50 font-medium placeholder:text-white/50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Search for a user" />
                    </div>
                    <Button variant={"outline"} onClick={onClose} className="py-6 cursor-pointer">Cancel</Button>
                </div>
                <div className="text-white rounded-lg w-full space-y-4 overflow-y-auto mt-1 scrollbar-hide">
                    {RENDER_RESULTS()}
                </div>
            </div>
        </Modal>
    )
}

export default SearchModal