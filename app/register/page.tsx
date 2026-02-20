"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registrar-se</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Correu" className="w-full p-2 border" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contrasenya" className="w-full p-2 border" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Crear compte</button>
      </form>
    </div>
  );
}