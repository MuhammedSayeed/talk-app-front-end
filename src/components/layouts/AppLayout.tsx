import Navbar from '@/components/ui/Navbar/Navbar'
import React, { ReactNode } from 'react'

interface IProps {
    children: ReactNode;
}

const AppLayout = ({ children }: IProps) => {
    return (
        <div className="h-screen bg-bg-color flex flex-col">
            <Navbar />
            <div className="h-full grid grid-rows-[80px_1fr] overflow-hidden">
                <div className=""></div>
                {children}
            </div>
        </div>
    )
}

export default AppLayout