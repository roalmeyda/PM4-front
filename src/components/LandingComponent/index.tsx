"use client"
import React from 'react'
import { Button } from '@heroui/react';
import {useRouter} from 'next/navigation';

export default function LandingComponent() {
  const router = useRouter();
  return (
     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Bienvenido a Apple Shop</h1>
      <p className="text-xl text-gray-700 mb-6">
        Has llegado al lugar donde encontrarás los productos Apple al mejor precio.
      </p>
      <Button onPress={() => router.push("/home")} color="secondary" className="mb-4" >Ir a la Tienda</Button>
    </div>
  )
}
