"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Currency from "@/components/Currency/Currency";

const MOBILE_MAX_WIDTH = 768;

export default function CurrencyPage() {
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < MOBILE_MAX_WIDTH;
      setIsMobile(mobile);
      if (!mobile) {
        router.push("/transactions");
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [router]);

  if (!isMobile) {
    return null;
  }

  return <Currency />;
}
