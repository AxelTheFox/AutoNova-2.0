import Image from "next/image";

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
    <div className="border rounded p-4 shadow">
      {car.images.length > 0 ? (
        <img
          src={car.images[0]}
          alt={car.title}
          // width={400}
          // height={250}
          className="object-cover w-full h-64 rounded mb-2"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-2">
          No Image
        </div>
      )}
      <h2 className="text-xl font-bold">{car.title}</h2>
      <p className="text-blue-600 font-semibold">{car.price} €</p>
    </div>
  );
}