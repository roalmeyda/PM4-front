'use client'
import { Product } from '@/interfaces/product'
import React from 'react'
import {Card, CardBody, CardFooter,Image} from "@heroui/react";

export default function CardProduct ({name,price,image}:Product) {

  return (
    
    <Card isPressable shadow="sm" className="w-[300px] sm:w-[420px] min-h-[420px] sm:min-h-[640px]">
    <CardBody className="w-full h-[80%] flex items-center justify-center">
        <Image
          alt={name}
          className="w-full h-full object-cover"
          src={image}
        />
       
    </CardBody>
    <CardFooter className="text-xl justify-between w-full h-[20%]">
      <b>{name}</b>
      <p className="text-default-500">USD {price}</p>
    </CardFooter>
  </Card>
  
);
  
}
