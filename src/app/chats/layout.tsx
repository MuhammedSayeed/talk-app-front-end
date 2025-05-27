import AppLayout from '@/components/layouts/AppLayout';
import React, { ReactNode } from 'react'



interface IProps {
    children: ReactNode;
}

const layout = ({ children }: IProps) => {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}

export default layout