"use client";

import { useEffect, useState } from "react";

const STATUS_MESSAGES = ["正在理解你的关系模式", "正在整理你的情感需求", "正在生成专属建议"];

const STATUS_INTERVAL_MS = 2600;

export default function GeneratingScreen() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, STATUS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-paper px-6 text-center">
      <p className="font-heading text-lg text-clay-dark">Rela 正在深入理解你</p>

      <div className="relative flex h-32 w-64 items-center justify-center">
        <svg
          viewBox="0 0 200 140"
          className="absolute inset-0 h-full w-full"
          style={{ animation: "revealSculpture 6.5s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <path
            d="M30 120 L30 60 A70 70 0 0 1 170 60 L170 120"
            fill="none"
            stroke="var(--color-clay)"
            strokeWidth="1.5"
          />
          <line x1="100" y1="46" x2="100" y2="120" stroke="var(--color-clay)" strokeWidth="1" opacity="0.5" />
        </svg>

        <svg
          viewBox="0 0 60 60"
          className="absolute h-14 w-14"
          style={{ animation: "driftLeftShape 6.5s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <circle cx="30" cy="30" r="24" fill="none" stroke="var(--color-ink-soft)" strokeWidth="1.5" />
        </svg>

        <svg
          viewBox="0 0 60 60"
          className="absolute h-14 w-14"
          style={{ animation: "driftRightShape 6.5s ease-in-out infinite" }}
          aria-hidden="true"
        >
          <rect
            x="8"
            y="8"
            width="44"
            height="44"
            rx="4"
            fill="none"
            stroke="var(--color-ink-soft)"
            strokeWidth="1.5"
            transform="rotate(45 30 30)"
          />
        </svg>
      </div>

      <p className="text-base font-medium text-ink">正在生成你的关系说明书……</p>

      <p key={statusIndex} className="text-sm text-ink-soft animate-[fadeIn_0.4s_ease-in-out]">
        {STATUS_MESSAGES[statusIndex]}
      </p>

      <p className="mt-4 text-xs text-ink-soft">请不要关闭页面，大约需要 10-30 秒</p>
    </div>
  );
}
