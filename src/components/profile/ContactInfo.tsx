import { formatTimeDifferentForm } from '@/lib/timeFormat';
import { AtSign, Calendar, Mail } from 'lucide-react';
import React from 'react'


interface IProps {
    username: string;
    email: string;
    createdAt: string;
}

export const ContactInfo = ({ username, email, createdAt }: IProps) => {

    const joinedDate = createdAt && formatTimeDifferentForm(createdAt);
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-200">
                <AtSign className='size-5' /> <span>{username}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
                <Mail className='size-5' /> <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
                <Calendar className='size-5' /> Joined In {joinedDate}
            </div>
        </div>
    )
}
