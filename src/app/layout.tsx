
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NavbarComponent from "@/components/NavbarComponent";
import Footer from "@/components/Footer";
// import NavbarComponent from "@/components/NavbarComponent";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='white'>
      <body className="h-full w-full" >
        <Providers>
          <div className="flex flex-col min-h-screen">

            <NavbarComponent />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="top-center" richColors />
          </div>
        </Providers>

      </body>
    </html>
  );
}