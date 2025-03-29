export interface OrderInterface {
    id: number;
    status: string;
    date: string;
    products: { id: number; name: string; price: number }[]; // Ajusta si los productos tienen más propiedades
  }
  