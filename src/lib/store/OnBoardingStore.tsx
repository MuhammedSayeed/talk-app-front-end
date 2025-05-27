import { create } from "zustand";

interface onBoarding {

    onBoarding : boolean;
    setOnBoarding : (onBoarding: boolean) => void;
}


const useOnBoardingStore = create<onBoarding>((set) => ({
    onBoarding : false,
    setOnBoarding : (onBoarding) =>{
        set(() => ({ onBoarding }))
    }
}));

export default useOnBoardingStore;
