"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login correcte!");
      window.location.href = "/";
    } else {
      alert(data.error || "Error en login");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Iniciar sessió</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Correu" className="w-full p-2 border" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contrasenya" className="w-full p-2 border" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Entrar</button>
      </form>
    </div>
  );
}
