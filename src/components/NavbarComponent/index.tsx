"use client"
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import Logo from '../Logo';
import useUserDataStore from '@/store';
import { ShoppingCart } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
;

export default function NavbarComponent() {
  const { userData, setUserData, cart } = useUserDataStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (pathname === '/') return null;

  const handleLogout = () => {
    // Limpiar datos del store y localStorage
    setUserData({ id: 0, name: "", email: "", password: "", phone: "", address: "", role: "", token: "" }); // Limpiar el estado del usuario
    localStorage.removeItem("userData-storage"); // Eliminar datos del localStorage (si los usas)
    router.push("/login"); // Redirigir al login
  };

  // Si aún no se hidrató, no renderizar nada
  if (!isHydrated) {
    return null;
  }
  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full", 
          "justify-center", 
          "items-center",               
          ],

      }}>
     {/* LOGO A LA IZQUIERDA */}
      <NavbarBrand >
        <Link href="/home" className="font-bold text-inherit flex items-center">
          <Logo />
          <span className="font-bold text-inherit ml-2">Apple Shop</span>
        </Link>
      </NavbarBrand>

      <div className="flex-1"></div>

      {/* Botones alineados completamente a la derecha */}
      <NavbarContent justify="end">
        {isLoading ? null : userData.token?.trim() ? (
          <>
            {pathname !== '/home' &&
              <NavbarItem>
                <Button as={Link} color="primary" href="/home" variant="flat">
                  Tienda
                </Button>
              </NavbarItem>
            }
            <NavbarItem>
              <Button as={Link} color="primary" href="/dashboard" variant="flat">
                Dashboard
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat" onPress={handleLogout}>
                Cerrar Sesión
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Link href="/cart" className="relative">
                <ShoppingCart size="24" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            {pathname !== '/home' &&
              <NavbarItem>
                <Button as={Link} color="primary" href="/home" variant="flat">
                  Tienda
                </Button>
              </NavbarItem>
            }
            {pathname !== '/login' &&
              <NavbarItem>
                <Button as={Link} color="primary" href="/login" variant="flat">
                  Iniciar Sesión
                </Button>
              </NavbarItem>
            }
            {pathname !== "/signup" && (
              <NavbarItem>
                <Button as={Link} color="primary" href="/signup" variant="flat">
                  Registrarse
                </Button>
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
