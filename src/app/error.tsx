'use client';

import { Button } from "@/components/ui/button";

interface Props {
    error: Error;
    reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {


    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 space-y-2">
            <h1 className="text-2xl font-bold text-white">Something went wrong.</h1>
            <p className="text-white/80 ">{error.message}</p>
            <Button onClick={reset} className="mt-3 cursor-pointer" variant={"outline"} >Try Again</Button>

        </div>
    );
}
