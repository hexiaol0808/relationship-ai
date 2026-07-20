import type { CSSProperties } from "react";
import Button from "./Button";
import SculptureVisual from "./SculptureVisual";

interface OnboardingScreenProps {
  eyebrow?: { primary: string; secondary: string };
  title: string;
  subtitle?: string;
  items?: string[];
  footNote?: string;
  ctaLabel: string;
  onCta: () => void;
  sculptureStage: 1 | 2 | 3;
}

const STAGGER_MS = 350;

function riseInStyle(index: number): CSSProperties {
  return {
    animation: `riseIn 0.5s ease-out both`,
    animationDelay: `${index * STAGGER_MS}ms`,
  };
}

export default function OnboardingScreen({
  eyebrow,
  title,
  subtitle,
  items,
  footNote,
  ctaLabel,
  onCta,
  sculptureStage,
}: OnboardingScreenProps) {
  let i = 0;

  return (
    <div className="relative h-full w-full px-6 text-center">
      {/* 背景雕塑：常驻、极淡，不参与文字的逐条淡入节奏 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <SculptureVisual stage={sculptureStage} />
      </div>

      {/* 内容区：垂直居中在"按钮预留空间"以上的区域，按钮位置在所有屏之间保持一致 */}
      <div className="absolute inset-x-0 top-0 bottom-28 flex items-center justify-center px-6">
        <div className="relative flex max-w-md flex-col items-center gap-4">
          {eyebrow && (
            <div className="flex flex-col gap-1" style={riseInStyle(i++)}>
              <p className="font-heading text-lg italic text-clay">{eyebrow.primary}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{eyebrow.secondary}</p>
            </div>
          )}

          <h1
            className="whitespace-pre-line font-heading text-3xl leading-snug text-ink md:text-4xl"
            style={riseInStyle(i++)}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="text-base leading-relaxed text-ink-soft" style={riseInStyle(i++)}>
              {subtitle}
            </p>
          )}

          {items && (
            <ul className="flex flex-col items-start gap-2.5 pt-1 text-left text-base text-ink">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2" style={riseInStyle(i++)}>
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {footNote && (
            <p className="pt-1 text-xs tracking-wide text-ink-soft" style={riseInStyle(i++)}>
              {footNote}
            </p>
          )}
        </div>
      </div>

      {/* 按钮：所有屏固定同一位置，靠近底部，避开安全区域 */}
      <div
        className="absolute inset-x-0 flex justify-center px-6"
        style={{ bottom: "max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))", ...riseInStyle(i++) }}
      >
        <Button onClick={onCta} data-testid="onboarding-cta">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
