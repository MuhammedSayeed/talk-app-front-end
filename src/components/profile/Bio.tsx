import React from 'react'

interface IProps {
    bio: string;
}
const Bio = ({ bio}: IProps) => {

    return (
        <span className="text-gray-200 text-base tracking-wider flex items-center justify-center gap-2">
            {bio} 
        </span>
    )
}

export default Bio