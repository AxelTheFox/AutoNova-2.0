import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!rows.length) return NextResponse.json({ error: "Usuari no trobat" }, { status: 404 });
        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return NextResponse.json({ error: "Contrasenya incorrecta" }, { status: 401 });
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        const response = NextResponse.json({ message: "Inici de sessió correcte" });
        response.cookies.set("token", token, { httpOnly: true, secure: false, path: "/" });
        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error intern" }, { status: 500 });
    }
}
