"use client"

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SignupFormInputs } from "@/interface/SignupFormInputs";
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
          required: { value: true, message: "Your name is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Ingrese un email válido"
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        rules={{
          required: { value: true, message: "Phone is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message} // ✅ Hero UI usa `errorMessage`
            label="Phone"
            labelPlacement="outside"
            placeholder="Enter your phone"
          />
        )}

      />
      <Controller
        control={control}
        name="address"
        rules={{
          required: { value: true, message: "Your address is required" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message} // ✅ Hero UI usa `errorMessage`
            label="Address"
            labelPlacement="outside"
            placeholder="Enter your address"
          />
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: { value: true, message: "Password is required" },
          minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
          maxLength: { value: 16, message: "No debe superar los 16 caracteres" },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
            message:
              "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
          />
        )}
      />

      <div className="flex gap-2 mt-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
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
