"use client";

export default function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Busca per nom o model..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-[25%] p-3 border rounded-lg shadow"
    />
  );
}