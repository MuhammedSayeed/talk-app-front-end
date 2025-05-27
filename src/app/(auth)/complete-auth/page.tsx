import TokenExchanger from "@/components/TokenExchanger";

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