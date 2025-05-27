"use client";

import { useEffect, useState } from "react";


const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const updateNetworkStatus = () => {
            setIsOnline(navigator.onLine);
        };
        updateNetworkStatus();
        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
        return () => {
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
        };
    }, []);

    if (!isOnline) {
        return (
            <div className="fixed inset-0 w-full h-screen z-[99999] bg-bg-color">
                <div className="flex flex-col justify-center items-center h-full gap-5">
                    <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20h.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.5 16.429a5 5 0 0 1 7 0" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 12.859a10 10 0 0 1 5.17-2.69" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19 12.859a10 10 0 0 0-2.007-1.523" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2 8.82a15 15 0 0 1 4.177-2.643" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M22 8.82a15 15 0 0 0-11.288-3.764" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="m2 2 20 20" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <div className="flex flex-col text-center">
                        <span className="text-2xl font-bold text-red-600">You are offline</span>
                        <span>Please check your connection.</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default NetworkStatus