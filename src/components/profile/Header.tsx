import React from 'react'
import NameOfUser from './NameOfUser';
import Bio from './Bio';



interface IProps{
    name : string;
    bio : string
}
const Header = ({name , bio} : IProps) => {
    return (
        <div className="w-full text-center">
            <NameOfUser name={name as string} />
            {bio && <Bio bio={bio as string} />}
        </div>
    )
}

export default Header