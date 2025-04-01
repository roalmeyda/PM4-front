import React from 'react'
import Image from 'next/image';

export default function Logo() {
    return (
      <Image 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/625px-Apple_logo_black.svg.png"  // Ruta de la imagen del logo
      alt="Logo"                    // Texto alternativo para accesibilidad
      height="18"                   // Tamaño deseado para el logo
      width="18"                    // Tamaño deseado para el logo
  />
   
      );
}
