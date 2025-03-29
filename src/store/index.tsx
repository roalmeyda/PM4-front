import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { userDataInterface, EcommerceDataStoreInterface } from "@/interface/EcommerceDataStoreInterface";
import { Iproduct } from "@/interface/product.interface";

const useUserDataStore = create<EcommerceDataStoreInterface>()(
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
                setUserData: (data: userDataInterface) => set({ userData: data }),
                setCart: (data: Iproduct[]) => set({ cart: data }),

            }),
            {
                name: "userData-storage",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);

export default useUserDataStore;