"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CarCard from "@/components/CarCard";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const cars = [
    {
      id: "1",
      title: "BMW 320d",
      brand: "BMW",
      model: "320d",
      price: 15000,
      images: [],
    },
  ];

  const filtered = cars.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Cotxes en venda</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
