import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ user: null });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string; name: string };
        return NextResponse.json({user: { id: decoded.id, email: decoded.email, name: decoded.name }});
    } catch {
        return NextResponse.json({ user: null });
    }
}
