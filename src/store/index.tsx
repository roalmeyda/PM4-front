import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { UserData, EcommerceStore } from "@/interfaces/ecommerce-store";
import { Product } from "@/interfaces/product";

const useUserDataStore = create<EcommerceStore>()(
    devtools(
        persist(
            (set) => ({
                userData: {
                    id: 0,
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    address: "",
                    role: "",
                    token: "",
                },
                cart: [],
                setUserData: (data: UserData) => set({ userData: data }),
                setCart: (data: Product[]) => set({ cart: data }),

            }),
            {
                name: "userData-storage",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);

export default useUserDataStore;