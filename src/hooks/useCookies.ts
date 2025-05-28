"use client"

const useCookies = () => {
    const setToken = async (token: string): Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/set-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to set token")
            return true;
        } catch {
            return false
        }
    }
    const clearToken = async () : Promise<boolean> => {
        try {
            const res = await fetch("/api/auth/clear-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to clear token")
            return true;
        } catch {
            return false
        }
    }
    return {setToken , clearToken}
}

export default useCookies