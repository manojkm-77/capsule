import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  label?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionTitle({ label, title, description, action, className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={`mb-10 flex items-end justify-between ${className || ""}`}
    >
      <div className="max-w-xl">
        {label && (
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted">
            {label}
          </span>
        )}
        <h2 className="text-[clamp(1.75rem,4vw,2.625rem)] font-bold leading-[1.15] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action && <div className="hidden sm:block">{action}</div>}
    </motion.div>
  );
}
