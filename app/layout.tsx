import { AuthProvider } from "@/components/Auth/AuthProvider";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { ToastProvider } from "@/components/ToastProvider/ToastProvider";
import styles from "./Dashboard.module.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Spendy",
  description: "Personal finance tracker",
  icons: {
    icon: "/favicon.ico",
  },
};
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};
export default function RootLayout({ children, sidebar }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <AuthProvider>
          <TanStackProvider>
            <main className={styles.mainContainer}>
              {sidebar}
              <div>{children}</div>
            </main>
          </TanStackProvider>
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
