import { Iproduct } from "./product.interface";

export interface EcommerceDataStoreInterface {
    userData: userDataInterface;
    cart: Iproduct[];
    setUserData: (data: userDataInterface) => void;
    setCart: (data: Iproduct[]) => void;
}

export interface userDataInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    token: string;
}