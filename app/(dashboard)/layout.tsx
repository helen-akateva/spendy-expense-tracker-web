"use client";

import Header from "@/components/UserAcountLayout/Header/Header";
import Sidebar from "@/components/UserAcountLayout/Sidebar/Sidebar";
import styles from "./layout.module.css";
import { useLoadCurrentUser } from "@/lib/hooks/useLoadCurrentUser";
import { Loader } from "@/components/Loader/Loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useLoadCurrentUser();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={styles.dashboardWrapper}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
