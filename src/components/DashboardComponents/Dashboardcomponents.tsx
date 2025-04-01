"use client"
import { getOrdersService } from '@/Services/orderServices';
import { Order } from '@/interfaces/order';
// import React, { useEffect, useState } from 'react'
import useUserDataStore from '@/store';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { User } from "@heroui/react";

function Dashboardcomponents() {
    // const router = useRouter();
    const { userData } = useUserDataStore();
    const [orders, setOrders]  = useState<Order[]>([]);
    // const router = useRouter();

    const getOrders = async () => {
        try {
            const orders = await getOrdersService(userData.token);
            setOrders(orders)
            console.log("ordenes:",orders);
            
        } catch (error) {
            throw new Error((error as Error).message);

    }
}

useEffect (() =>{
    if(userData.token !== ""){
        getOrders();
        // router.push('/dashboard');

    }
   
},[userData]);


// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//     if (userData.token !== "") {
//         setIsLoading(false); // Marcar que los datos fueron cargados
//     } else if (!isLoading) {
//         console.log("userdata.token", userData.token);
//         router.push("/login");
//     }
// }, [userData, router, isLoading]);
return (
  
    <>
          <div className="max-w-4xl mx-auto p-6">
      {/* Datos personales */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-700 border-b pb-2">Datos Personales</h2>
        <div className="mt-4 space-y-2 text-gray-600">
          <p><span className="font-semibold">Nombre:</span> {userData.name}</p>
          <p><span className="font-semibold">Email:</span> {userData.email}</p>
          <p><span className="font-semibold">Teléfono:</span> {userData.phone}</p>
          <p><span className="font-semibold">Dirección:</span> {userData.address}</p>
        </div>
      </div>

      {/* Órdenes realizadas */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 border-b pb-2">Órdenes Realizadas</h2>

        {orders.length > 0 ? (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-lg text-gray-700">Orden #{order.id}</p>
                <p className="text-sm text-gray-500">Fecha: {new Date(order.date).toLocaleString()}</p>
                <div className="mt-2 space-y-2">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 border-t pt-2">
                                <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-gray-500">USD {product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Aún no has realizado ninguna compra.</p>
        )}
      </div>
    </div>
    </>

)
}

export default Dashboardcomponents
