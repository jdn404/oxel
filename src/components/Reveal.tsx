import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
