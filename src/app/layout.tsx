 // Marking the component as a Client Component

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Navbar from "@/components/Nav/Navbar";
import { CartContextProvider } from "@/context/userOrder";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Celestia 2024",
  description: "Experience the magical world with us!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 



  return (
    <html lang="en">
    
      
      <body  className={`${poppins.className} antialiased`}>
    
          <CartContextProvider>

            <Navbar />
           
            {children}
          
            <Toaster />
          </CartContextProvider>
      
      </body>
     
    </html>
  );
}
