import AppLayout from '@/components/layouts/AppLayout';
import Sidebar from '@/components/sidebar/Sidebar';
import React, { ReactNode } from 'react'


interface IProps {
    children: ReactNode;
}
const layout = ({ children }: IProps) => {
    return (
        <AppLayout>
            <div className="w-full h-full grid grid-cols-[auto_1fr] ">
                <Sidebar />
                <div className="px-4 py-6 ">
                    {children}
                </div>
            </div>
        </AppLayout>
    )
}

export default layout