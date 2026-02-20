import { db } from "@/lib/db";
import SearchBar from "@/components/SearchBar";
import CarCard from "@/components/CarCard";

export const dynamic = "force-dynamic";

type Car = {
  id: number;
  brand: string;
  model: string;
  price: number;
  fuel: string;
  year: number;
  power: number;
  km: number;
  description: string;
};

export default async function HomePage() {
  const [rows] = await db.query("SELECT * FROM cars ORDER BY created_at DESC");
  const cars = rows as Car[];

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Cotxes en venta</h1>

      {/* De moment deixem SearchBar sense filtre real */}
      {/* <SearchBar query="" setQuery={() => {}} /> */ }

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
              images: [],
            }}
          />
        ))}
      </div>
    </div>
  );
}
