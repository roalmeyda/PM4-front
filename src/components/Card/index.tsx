'use client'
import { Iproduct } from '@/interface/product.interface'
import React from 'react'
import {Card, CardBody, CardFooter,Image} from "@heroui/react";


export default function CardProduct ({name,price,image}:Iproduct) {
  console.log(image);
  return (
    
    <Card isPressable shadow="sm" onPress={() => console.log("item pressed")} className="w-[200px] h-[320px]">
    <CardBody className="w-full h-80 flex items-center justify-center">
   
        <Image
          alt={name}
          className="w-full h-full object-cover"
          src={image}
        />
       
    </CardBody>
    <CardFooter className="text-small justify-between w-full h-20">
      <b>{name}</b>
      <p className="text-default-500">USD {price}</p>
    </CardFooter>
  </Card>
  
);
  
}
