import { NextResponse } from "next/server"
import { cookies } from "next/headers"


export async function POST() {
    try {
      ;(await cookies()).set("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      })
  
      return NextResponse.json(
        { success: true, message: "Token cleared successfully" },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    } catch{
      return NextResponse.json({ error: "Failed to clear token" }, { status: 500 })
    }
  }