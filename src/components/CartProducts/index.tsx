"use client"

import { useState, useEffect } from 'react';
import useUserDataStore from '@/store';
import { Image, Button } from '@heroui/react';
import { toast } from 'sonner';
import { createOrder } from '@/Services/orderServices';

const CardProducts = () => {
  const { userData, cart, setCart } = useUserDataStore();
  const [hydrated, setHydrated] = useState(false);

  const removeItem = (id: number) => () => {
    setCart(cart.filter((item) => item.id !=
      id));
      toast.message("Producto eliminado del carrito.", {
        position: "bottom-center",  
      });
  }
  const handleCheckout = async () => {
    try {
      const idsCart = cart.map((item) => item.id);
      const response = await createOrder(idsCart, userData.token, userData.id);
      console.log("Orden realizada:",response);
      if (response.status == 400) { 
        toast.message(response.error);
        
      }
      if (response.status == "approved") {

        toast.success("Compra realizada con éxito.");
        setCart([]);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; 

  return (


    cart.length > 0 ? (
      <div>
        <h1 className="text-2xl font-bold mb-4">Productos en el carrito</h1>

        <table className="w-full border-collapse border border-gray-300">
          {/* Encabezado de la tabla */}
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Imagen</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Acción</th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody>
            {cart.map((product) => (
              <tr key={product.id} className="border-b">
                {/* Imagen */}
                <td className="border border-gray-300 px-4 py-2">
                  <Image
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                    src={product.image}
                  />
                </td>
                {/* Nombre */}
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                {/* Precio */}
                <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                {/* Botón de eliminar */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Button color="primary" onPress={removeItem(product.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex flex-col items-end pr-4 space-y-4">
          <h1 className="text-xl font-bold">Total de productos: {cart.length}</h1>
          <h2 className="text-2xl font-bold">Total a pagar USD: ${cart.reduce((total, product) => total + product.price, 0)}</h2>
          <Button color="primary" className="mt-2" onPress={handleCheckout}>
            Comprar
          </Button>
        </div>
      </div>
    ) : (
      toast.message("No hay productos en el carrito.",
        {
          position: "bottom-center", 
        }
      )
    )
  );




}

export default CardProducts;
