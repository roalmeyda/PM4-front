import { Product } from "@/interfaces/product";
import { apiUrl } from "./config";

export async function getProducts() {
   try {
      const res = await fetch(`${apiUrl}/products`, {
         method: "GET",
         next: { revalidate: 3600 }
      });
      if (!res.ok) {
         throw new Error(`Error en la API: ${res.status} - ${res.statusText}`);
      }
      const products: Product[] = await res.json();
      return products;
   } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
   }
}

export async function getProductById(id: string) {
   try {
      const products = await getProducts();
      if (!products) throw new Error("No se pudieron obtener los productos");

      const product = products.find((product) => product.id == Number(id));
      if (!product) throw new Error("Producto no encontrado");
      return product;
   } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
   }
}
