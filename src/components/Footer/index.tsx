"use client"
import React from 'react'
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">© {new Date().getFullYear()} E-commerce Todos los derechos reservados.</p>
        <nav className="flex space-x-4">
          <a href="/about" className="hover:text-gray-400">Nosotros</a>
          <a href="/contact" className="hover:text-gray-400">Contacto</a>
          <a href="/faq" className="hover:text-gray-400">FAQ</a>
        </nav>
      </div>
    </footer>
  );
}