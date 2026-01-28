"use client";

import { useEffect, useState } from "react";

import { useFinanceStore } from "@/lib/stores/financeStore";
import { getCurrentUser } from "../api/summaryApi";

export function useLoadCurrentUser() {
  const setUserData = useFinanceStore((s) => s.setUserData);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const user = await getCurrentUser();
        setUserData(user); // user.balance → у стор
      } catch (err) {
        console.error("Failed to load current user", err);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [setUserData]);

  return { isLoading };
}
