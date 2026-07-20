"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "filled" | "outline";
  className?: string;
  "data-testid"?: string;
}

const VARIANT_CLASS: Record<"filled" | "outline", string> = {
  filled: "bg-clay text-white hover:bg-clay-dark",
  outline: "border border-clay/40 text-clay-dark hover:bg-card",
};

const BASE_CLASS = "flex h-14 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  fullWidth,
  variant = "filled",
  className = "",
  ...rest
}: ButtonProps) {
  const widthClass = fullWidth ? "w-full" : "w-full max-w-[320px]";
  const classes = `${BASE_CLASS} ${VARIANT_CLASS[variant]} ${widthClass} ${className}`;

  // 阻止冒泡：这个按钮很可能叠在某个"点击背景前进/切换"的容器上面（比如 onboarding 的右侧点击区），
  // 点按钮本身不应该再触发外层容器自己的点击逻辑。
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    onClick?.();
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={handleClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
