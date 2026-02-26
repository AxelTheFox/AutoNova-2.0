import Image from "next/image";
import Link from "next/link";

type CarCardProps = {
  car: {
    id: string;
    title: string;
    brand: string;
    model: string;
    price: number;
    images: string[];
  };
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`} className="block">
      <div className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer">
        {car.images.length > 0 ? (
          <img
            src={car.images[0]}
            alt={car.title}
            className="object-cover w-full h-64 rounded mb-2"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-2">
            No Image
          </div>
        )}

        <h2 className="text-xl font-bold">
          {car.brand} {car.model}
        </h2>

        <p className="text-blue-600 font-semibold">
          {car.price} €
        </p>
      </div>
    </Link>
  );
}