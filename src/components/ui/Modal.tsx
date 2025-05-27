"use client"

import { useEffect } from "react";


interface IProps {
    width? : string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose , children }: IProps) => {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [onClose]);

    return (
        <div onClick={onClose} className={`fixed inset-0 z-[120] w-full h-screen  bg-primary-light/95  flex justify-center items-center transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className="relative w-full mx-4 bg-bg-color border border-primary-lighter shadow-md rounded-lg max-w-[484px] p-4">
                {children}
            </div>
        </div>
    )
}

export default Modal