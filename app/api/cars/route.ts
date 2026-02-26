import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const brand = formData.get("brand") as string;
        const model = formData.get("model") as string;
        const price = formData.get("price") as string;
        const year = formData.get("year") as string;
        const power = formData.get("power") as string;
        const km = formData.get("km") as string;
        const description = formData.get("description") as string;

        const fuel = formData.get("fuel") as string;
        const allowedFuels = ["gasolina", "diesel", "hibrid", "hibrid enxufable", "electric", "glp", "gnc"];

        const normalizedFuel = fuel
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (!normalizedFuel || !allowedFuels.includes(normalizedFuel)) {
            return NextResponse.json({ error: "Combustible no vàlid." }, { status: 400 });
        }

        const images = formData.getAll("images") as File[];

        if (!brand || !model || !price) return NextResponse.json({ error: "Falten camps obligatoris." }, { status: 400 });

        const uploadsDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadsDir, { recursive: true });

        let imagePaths: string[] = [];

        for (const image of images) {
            if (image && image.size > 0) {
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const fileName = Date.now() + "-" + image.name.replace(/\s+/g, "_");
                const filePath = path.join(uploadsDir, fileName);

                await writeFile(filePath, buffer);

                imagePaths.push("/uploads/" + fileName);
                console.log("Imatge guardada a:", filePath);
            }
        }

        await db.query(
            `INSERT INTO cars 
            (brand, model, price, fuel, year, power, km, description, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [brand, model, Number(price), fuel, Number(year), Number(power), Number(km), description, imagePaths[0] || null]
        );

        return NextResponse.json({ message: "Cotxe guardat correctament" }, { status: 201 });

    } catch (error) {
        console.error("Error al guardar cotxe:", error);
        return NextResponse.json({ error: "Error intern del servidor" }, { status: 500 });
    }
}