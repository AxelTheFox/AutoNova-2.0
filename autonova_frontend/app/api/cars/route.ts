import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            brand,
            model,
            price,
            fuel,
            year,
            power,
            km,
            description,
        } = body;

        // Validació bàsica
        if (!brand || !model || !price) {
            return NextResponse.json(
                { error: "Falten camps obligatoris" },
                { status: 400 }
            );
        }

        await db.query(
            `INSERT INTO cars 
            (brand, model, price, fuel, year, power, km, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [brand, model, price, fuel, year, power, km, description]
        );

        return NextResponse.json(
            { message: "Cotxe guardat correctament" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error al guardar cotxe:", error);
        return NextResponse.json(
            { error: "Error intern del servidor" },
            { status: 500 }
        );
    }
}