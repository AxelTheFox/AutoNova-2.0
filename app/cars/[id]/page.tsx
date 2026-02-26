import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
    params: { id: string };
}

export default async function CarDetailPage({ params }: Props) {
    const [rows]: any = await db.query("SELECT * FROM cars WHERE id = ?", [params.id]);

    if (!rows.length) notFound();

    const car = rows[0];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{car.brand} {car.model}</h1>
            {car.image_url && (<Image src={car.image_url} alt={`${car.brand} ${car.model}`} width={800} height={500} className="rounded-xl mb-6" />)}
            <div className="grid grid-cols-2 gap-4 text-lg">
                <p><strong>Preu:</strong> {car.price} €</p>
                <p><strong>Any:</strong> {car.year}</p>
                <p><strong>Quilòmetres:</strong> {car.km} km</p>
                <p><strong>Potència:</strong> {car.power} cv</p>
                <p><strong>Combustible:</strong> {car.fuel}</p>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Descripció</h2>
                <p>{car.description}</p>
            </div>
        </div>
    );
}
