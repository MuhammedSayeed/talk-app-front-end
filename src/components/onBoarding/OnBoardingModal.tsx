"use client"
import Modal from '../ui/Modal'
import useOnBoardingStore from '@/lib/store/OnBoardingStore';
import EditBioArea from './EditBioArea';
import { Button } from '../ui/button';
import CoverPic from '../profile/CoverPic';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';
import ProfilePic from '../profile/ProfilePic';

const OnBoardingModal = () => {
    const { onBoarding, setOnBoarding } = useOnBoardingStore();
    const {user} = useContext(AuthContext);
    const handleClose = () => {
        setOnBoarding(false);
    }

    return (
        <Modal isOpen={onBoarding} onClose={handleClose}>
            <div className="w-full flex flex-col ">
                <div className="relative w-full h-[110px] ">
                    <CoverPic editable imgSrc={user?.coverPic.src as string} />
                    <ProfilePic editable imgSrc={user?.profilePic.src as string} />
                </div>
                <div className="mt-10 space-y-3">
                    <EditBioArea />
                    <div>
                        <Button className='cursor-pointer' size={"sm"} onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default OnBoardingModal
