
import { apiUrl } from "./config";


export async function createOrder(idsCart: number[], token: string, userId: number) {
    try {
        console.log("ids:",idsCart,"token:",token, "userId:",userId);
        const res = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
                Authorization: token,   
            },
            body: JSON.stringify({ products: idsCart, userId })
        });

        const order = await res.json();
        return order;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function getOrdersService(token:string){
    try {
        const res = await fetch (`${apiUrl}/users/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",  
                Authorization: token,   
            },
            
          });
          if (res.ok){
            const orders = await res.json();
            console.log(orders)
            return orders;

          }else {
            throw new Error ('Failed getErrors');
          }
     
    }catch (error) {
        throw new Error((error as Error).message);
    }
}
