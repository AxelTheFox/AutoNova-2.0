import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) return NextResponse.json({ error: "Falten camps" }, { status: 400 });
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        return NextResponse.json({ message: "Usuari creat correctament" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error intern" }, { status: 500 });
    }
}