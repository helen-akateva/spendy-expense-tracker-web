"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Tooltip.module.css";

interface Props {
    content: string;
    children: ReactNode;
}

const Tooltip = ({ content, children }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const top = rect.bottom + 8; // Offset from bottom
            // Basic positioning logic - can be enhanced to detect viewport edges
            let left = rect.left + rect.width / 2;

            // Ensure tooltip doesn't overflow right side of screen
            if (left > window.innerWidth - 150) {
                left = window.innerWidth - 160;
            }

            setCoords({ top, left });
        }
    }, [isVisible]);

    return (
        <div
            className={css.tooltipWrapper}
            ref={triggerRef}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible &&
                document.body &&
                createPortal(
                    <div
                        className={css.tooltipPortal}
                        style={{
                            top: coords.top,
                            left: coords.left,
                            transform: "translateX(-50%)",
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default Tooltip;
