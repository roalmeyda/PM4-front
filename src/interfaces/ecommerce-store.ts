import { Product } from "./product";

export interface EcommerceStore {    
    userData: UserData;
    cart: Product[];
    setUserData: (data: UserData) => void;
    setCart: (data: Product[]) => void;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    token: string;
}