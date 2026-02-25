import { db } from "@/lib/db";
import CarCard from "@/components/CarCard";

export const dynamic = "force-dynamic";

type Car = {
  id: number;
  brand: string;
  model: string;
  price: number;
  image?: string;
};

export default async function HomePage() {
  const [rows] = await db.query("SELECT * FROM cars ORDER BY created_at DESC");
  const cars = rows as Car[];

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Cotxes en vent  a</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={{
              id: car.id.toString(),
              title: `${car.brand} ${car.model}`,
              brand: car.brand,
              model: car.model,
              price: car.price,
              images: car.image ? [car.image] : [],
            }}
          />
        ))}
      </div>
    </div>
  );
}