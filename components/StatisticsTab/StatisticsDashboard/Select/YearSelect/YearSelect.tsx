import { useState, useRef, useEffect } from "react";
import css from "../Select.module.css";

interface YearSelectProps {
  value: number;
  onChange: (year: number) => void;
  years: number[];
}

export function YearSelect({ value, onChange, years }: YearSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className={css.select} ref={ref}>
      <button
        className={`${css.select__toggle} ${isOpen ? css.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}
        <svg
          width="24"
          height="24"
          className={`${css.select__arrow} ${isOpen ? css.open : ""}`}
        >
          <use href="/sprite.svg#icon-select-arrow" />
        </svg>
      </button>

      <div className={`${css.select__dropdown} ${isOpen ? css.open : ""}`}>
        {years.map((year) => (
          <div
            key={year}
            className={`${css.select__item} ${
              value === year ? css.active : ""
            }`}
            onClick={() => {
              onChange(year);
              setIsOpen(false);
            }}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}
