import LoginComponent from "@/components/loginComponent";
import React from "react";


export default function Login() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 h-[100vh] items-center justify-center mt-[-50px]">
      <LoginComponent/>
    </div>
  );
}