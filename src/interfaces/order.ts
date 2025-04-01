export interface Order {
    id: number;
    status: string;
    date: string;
    products: { id: number; name: string; price: number }[]; 
  }
  