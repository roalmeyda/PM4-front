"use client";

import { Iproduct } from "@/interface/product.interface";
import { Button, Image } from "@heroui/react";

import { ShoppingCart } from "lucide-react";
import useUserDataStore from '@/store';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@heroui/react";


//import { Image } from '@heroui/react';

function ProductDetail({ product }: { product: Iproduct }) {
  const { userData, cart, setCart } = useUserDataStore();
  const router = useRouter();

  const addToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (!existingProduct) {
      // Lógica para agregar el producto al carrito
      if (userData.token !== "") {
        setCart([...cart, product]);
        toast.message("Producto agregado al carrito.");
      } else {
        toast.message("Debes estar logueado para agregar productos al carrito.");
        router.push("/login");

      }
    } else {
      toast.message("El producto ya esta en el carrito.");
    }
  };
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Card
        isPressable
        shadow="sm"
        onPress={() => console.log("item pressed")}
        className="w-[500px] h-[720px] flex flex-col"
      >
        {/* Imagen - 60% */}
        <CardBody className="flex items-center justify-center h-[60%]">
          <Image
            alt={product.name}
            className="w-full h-full object-cover"
            src={product.image}
          />
        </CardBody>

        {/* Descripción - 30% */}
        <div className="h-[30%] px-4 flex items-center justify-center">
          <p className="text-default-500 text-center">{product.description}</p>
        </div>

        {/* Footer - 10% */}
        <CardFooter className="h-[10%] flex justify-between items-center px-4">
          <b>{product.name}</b>
          <p className="text-default-500">USD {product.price}</p>
        </CardFooter>

      </Card>
      <div className="mt-4">
        <Button color="primary" onPress={addToCart}>
          Comprar
          <ShoppingCart />
        </Button></div>

    </div>
  );
}

export default ProductDetail;
