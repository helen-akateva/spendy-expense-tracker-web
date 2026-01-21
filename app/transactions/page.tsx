"use client";

import { useState } from "react";
import css from "./page.module.css";

import ModalAddTransaction from "@/components/ModalAddTransaction/ModalAddTransaction";

export default function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={css.button} onClick={() => setIsModalOpen(true)}>
        <svg className={css.icon} width="25" height="25">
          <use href="/sprite.svg#icon-plus" />
        </svg>
      </button>

      {isModalOpen && (
        <ModalAddTransaction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
