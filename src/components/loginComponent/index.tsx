"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { LoginFormInputs } from "@/interfaces/auth";
import { loginUser } from "@/Services/authServices";
import { toast } from "sonner";
import useUserDataStore from "@/store";
import { useEffect } from "react";
import { UserData } from "@/interfaces/ecommerce-store"

export default function LoginComponent() {
  const { userData, setUserData } = useUserDataStore();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    }, [userData,router]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        const formattedData: UserData = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          password: "",
          phone: response.data.user.phone,
          address: response.data.user.address,
          role: response.data.user.role,
          token: response.data.token,
        };
        setUserData(formattedData);
        toast.success("Usuario logueado correctamente");
        if (localStorage.getItem("productId")) {
          router.push("/products/" + localStorage.getItem("productId"));
        } else {
          router.push("/dashboard");
        }
          } else {
        toast.error(response.error);
      }
    } catch {

      toast.error("Error inesperado en el login.");

    }


  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-2 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)} //
      onReset={() => {
        reset();
      }}
    >
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: { value: true, message: "El correo electrónico es requerido" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Ingrese un correo electrónico válido",
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message} 
            label="Correo electrónico"
            labelPlacement="outside"
            placeholder="Ingrese su correo electrónico"
          />
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: { value: true, message: "La contraseña es requerida" },
          minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
          maxLength: { value: 16, message: "No debe superar los 16 caracteres" },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
            message:
              "La contraseña debe tener al menos 8 caracteres, una letre mayúscula o una minúscula, un número y un carácter especial. ",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            label="Contraseña"
            labelPlacement="outside"
            placeholder="Ingrese su contraseña"
            type="password"
          />
        )}
      />

      <div className="flex gap-2 mt-2">
        <Button color="primary" type="submit">
          Enviar
        </Button>
        <Button type="reset" variant="flat">
          Borrar
        </Button>
      </div>
    </Form>
  );
}
