"use client"

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SignupFormInputs } from "@/interfaces/auth";
import { registerUser } from "@/Services/authServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function SignupComponent() {
  const [action, setAction] = useState<string | null>(null);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<SignupFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormInputs) => {
    const response = await registerUser(data);
    setAction(`submit ${JSON.stringify(data)}`);
    if (response) {
      toast.success("Usuario creado correctamente");
      router.push('/login');
    }

  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-2 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
        setAction("reset")
      }}

    >
      <Controller
        control={control}
        name="name"
        rules={{
          required: { value: true, message: "Su nombre es requerido" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            label="Nombre"
            labelPlacement="outside"
            placeholder="Ingrese su nombre"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: { value: true, message: "Su correo electrónico es requerido" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Ingrese un correo electrónico válido"
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
            placeholder="Ingrese su correo electórnico"
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        rules={{
          required: { value: true, message: "Su móvil es requerido" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message} // ✅ Hero UI usa `errorMessage`
            label="Número de móvil"
            labelPlacement="outside"
            placeholder="Ingrese su móvil"
          />
        )}

      />
      <Controller
        control={control}
        name="address"
        rules={{
          required: { value: true, message: "Su dirección es requerida" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message} // ✅ Hero UI usa `errorMessage`
            label="Dirección"
            labelPlacement="outside"
            placeholder="Ingrese su dirección"
          />
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: { value: true, message: "La contrasena es requerida" },
          minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
          maxLength: { value: 16, message: "No debe superar los 16 caracteres" },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
            message:
              "La contraseña debe tener al menos 8 caracteres, una letre mayúscula o minúscula, un número y un carácter especial.",
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

      {action && (
        <div className="text-small text-gray-600">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}
