"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import Onboarding from "./components/Onboarding";
import SculptureVisual from "./components/SculptureVisual";

const SEEN_KEY = "rela_onboarding_seen";

export default function Home() {
  const router = useRouter();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // 有意在 hydration 后才读 localStorage：服务端渲染时没有 window，
    // 用惰性初始值代替这个 effect 会导致服务端/客户端首次渲染结果不一致。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasSeenOnboarding(localStorage.getItem(SEEN_KEY) === "true");
  }, []);

  function skipOnboarding() {
    localStorage.setItem(SEEN_KEY, "true");
    setHasSeenOnboarding(true);
  }

  function completeOnboarding() {
    localStorage.setItem(SEEN_KEY, "true");
    router.push("/questionnaire");
  }

  function replayOnboarding() {
    localStorage.removeItem(SEEN_KEY);
    setHasSeenOnboarding(false);
  }

  if (hasSeenOnboarding === null) {
    return <div className="h-dvh w-full bg-paper" />;
  }

  if (!hasSeenOnboarding) {
    return <Onboarding onSkip={skipOnboarding} onComplete={completeOnboarding} />;
  }

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <SculptureVisual stage={3} />
      </div>

      <div className="relative flex max-w-md flex-col items-center gap-4 animate-[fadeIn_0.6s_ease-in-out]">
        <p className="font-heading text-lg italic text-clay">Rela</p>
        <h1 className="font-heading text-3xl leading-snug text-ink md:text-4xl">更懂自己，才能更好地爱。</h1>
        <p className="text-base leading-relaxed text-ink-soft">15道真实关系场景，生成属于你的关系说明书。</p>

        <div className="pt-2">
          <Button onClick={() => router.push("/questionnaire")} data-testid="start-cta">
            开始探索
          </Button>
        </div>

        <button type="button" onClick={replayOnboarding} className="pt-2 text-sm text-clay-dark underline">
          了解 Rela
        </button>
      </div>
    </div>
  );
}
