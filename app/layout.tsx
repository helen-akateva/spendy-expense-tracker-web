import type { Metadata } from "next";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";



export const metadata: Metadata = {
  title: 'Spendy',
  description: 'Personal finance tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          {children}
         </TanStackProvider>
        
      </body>
    </html>
  );
}
