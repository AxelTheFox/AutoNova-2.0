type Car = {
  id?: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  images?: string[];
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={car.images?.[0] || "https://via.placeholder.com/300"}
        alt={car.title}
        className="w-full h-48 object-cover"
      />
      <h3 className="font-bold mt-2">{car.title}</h3>
      <p>
        {car.brand} {car.model}
      </p>
      <p className="text-red-600 font-semibold">{car.price} €</p>
    </div>
  );
}