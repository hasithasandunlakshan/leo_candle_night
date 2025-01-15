
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
 
 
 export const metadata = {
  title: 'Where culture meets elegance.',
  description: '   Celebrate culture, elegance, and togetherness under the gentle glow of candlelight. Reserve your seat, savor delightful cuisine, and immerse yourself in a night filled with warmth and tradition. ',
  // openGraph: {
  //   type: 'website',
  //   url: 'https://shilpa.org',
  //   title: 'Shilpa-The Best Online Educational Platform in SriLanka',
  //   description: 'Discover Shilpa: your hub for Sinhala quizzes, past papers, and seminars. Experience instant results, expert interactions, and an engaging interface.',
  //   siteName: 'Shilpa',
  // },
  // verification: {
  //   google: 'aX14R74u1ymqjHgKTvdGVzNdtI5lf9_1n8lAUai-5e0',
  // },
  icons: {
    icon: [
      { url: '/images/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // manifest: '/site.webmanifest',
   manifest: '/images/favicon_io/site.webmanifest',
  additionalMetaTags: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ffffff' },
 
  ],
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
