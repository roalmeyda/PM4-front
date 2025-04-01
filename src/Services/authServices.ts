import { SignupFormInputs, LoginFormInputs} from "@/interfaces/auth";
import { apiUrl } from "./config";


export async function registerUser(userData: SignupFormInputs) {
    try {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
        console.log("Data: ", data);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export async function loginUser(userData: LoginFormInputs) {
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            return { success: false, error: data.error || "Error en el login, intenta de nuevo" };
        }

        return { success: true, data };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}


