"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";
import OnboardingScreen from "./OnboardingScreen";

interface OnboardingProps {
  /** 点"跳过"时调用：只标记已看过，落地到简版开始页，不直接进问卷 */
  onSkip: () => void;
  /** 第三屏"开始探索"本身调用：标记已看过 + 直接进入问卷 */
  onComplete: () => void;
}

const SCREENS = [
  {
    eyebrow: { primary: "Rela", secondary: "RELATIONSHIP INTELLIGENCE PLATFORM" },
    title: "关系不是运气，\n而是一种可以学习的能力。",
    subtitle: "每一段关系，都从理解自己开始。",
    ctaLabel: "继续",
    sculptureStage: 1 as const,
  },
  {
    title: "看见你在关系里的真实模式",
    subtitle: "15道真实关系场景，帮助你发现：",
    items: ["你真正需要怎样的理解与回应", "哪些互动模式会让关系反复卡住", "怎样更清楚地表达自己，也更好地理解对方"],
    ctaLabel: "继续",
    sculptureStage: 2 as const,
  },
  {
    title: "得到一份属于你的关系说明书",
    subtitle: "根据你的回答，Rela 将为你整理：",
    items: ["你的核心情感需求", "你在压力与冲突中的反应方式", "更适合你的沟通与关系修复建议"],
    footNote: "5–8分钟 · 个性化解读 · 完全免费 · 无需注册",
    ctaLabel: "开始探索",
    sculptureStage: 3 as const,
  },
];

const SWIPE_THRESHOLD = 60;

export default function Onboarding({ onSkip, onComplete }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  function goNext() {
    if (index === SCREENS.length - 1) {
      onComplete();
      return;
    }
    setDirection("forward");
    setIndex((i) => i + 1);
  }

  function goBack() {
    if (index === 0) return;
    setDirection("back");
    setIndex((i) => i - 1);
  }

  function handleContainerClick(e: MouseEvent<HTMLDivElement>) {
    if (e.clientX > window.innerWidth / 2) {
      goNext();
    }
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const deltaX = t.clientX - touchStart.current.x;
    const deltaY = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (deltaX < -SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      goNext();
    }
  }

  const screen = SCREENS[index];

  return (
    <div
      className="fixed inset-0 z-50 h-dvh w-full overflow-hidden bg-paper"
      onClick={handleContainerClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {index > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goBack();
          }}
          className="absolute left-4 z-20 text-sm text-ink-soft"
          style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        >
          ← 返回
        </button>
      )}

      {index > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSkip();
          }}
          className="absolute right-4 z-20 text-sm text-ink-soft"
          style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        >
          跳过
        </button>
      )}

      <div
        key={index}
        className={direction === "forward" ? "animate-[slideInFromRight_0.4s_ease-out_both]" : "animate-[slideInFromLeft_0.4s_ease-out_both]"}
        style={{ height: "100%", width: "100%" }}
      >
        <OnboardingScreen {...screen} onCta={goNext} />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 z-20 flex justify-center gap-2"
        style={{ bottom: "calc(max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem)) + 4.25rem)" }}
      >
        {SCREENS.map((_, i) => (
          <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-clay" : "border border-clay/40"}`} />
        ))}
      </div>
    </div>
  );
}
