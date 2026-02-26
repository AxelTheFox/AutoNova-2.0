"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeaderBar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-red-700 to-red-500 text-white p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/autonova-logoA.png" alt="AutoNova Logo" width={48} height={48} />
        <h1 className="text-2xl font-bold">AutoNova</h1>
      </Link>

      <div className="flex gap-2 items-center">
        <Link href="/"><button className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition">Inici</button></Link>
        <Link href="/sell"><button className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition">Vendre cotxe</button></Link>

        {user ? (
          <>
            <span className="font-semibold">Hola, {user.email}</span>
            <button onClick={handleLogout} className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login"><button className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition">Iniciar sessió</button></Link>
            <Link href="/register"><button className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition">Registrar-se</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}