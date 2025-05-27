import TokenExchanger from "@/components/TokenExchanger";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Completing Authentication",
    description: "Please wait while we complete your authentication process on Talk.",
    openGraph: {
      title: "Completing Authentication | Talk",
      description: "Hang tight! We're finalizing your login process securely.",
    },
    twitter: {
      card: "summary",
      title: "Completing Authentication | Talk",
      description: "Please wait while we finish logging you in securely.",
    },
  }

export default function CompleteAuthPage() {
    return (
        <div className="mt-60">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Completing Authentication</h1>
                <p className="mb-4">Please wait while we complete your authentication...</p>
                <TokenExchanger />
            </div>
        </div>
    );
}