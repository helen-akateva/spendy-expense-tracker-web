"use client";

import styles from "./Sidebar.module.css";
import Navigation from "./Navigation";
import Ballance from "./Ballance";
import Currency from "@/components/Currency/Currency";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function Sidebar() {
  const isMobile = useMediaQuery("(max-width: 767.9px)");
  const isTablet = useMediaQuery("(max-width: 1279.9px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <aside className={styles.sidebarContainer}>
      <Navigation />
      {isTablet && !isMobile && (
        <>
          <Ballance />
          {!isDesktop && <Currency />}
        </>
      )}
      {isDesktop && (
        <div className={styles.accountContainer}>
          <Ballance />
          <Currency />
        </div>
      )}
    </aside>
  );
}
