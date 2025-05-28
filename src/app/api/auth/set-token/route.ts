import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        if (!token) return NextResponse.json({ error: "Token is required" }, { status: 400 });

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        })
        return NextResponse.json(
            { success: true, message: "Token set successfully" },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            },
        )
    } catch {
        return NextResponse.json({ error: "Failed to set token" }, { status: 500 })
    }
}