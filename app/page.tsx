import Button from "./components/Button";
import FadeInSection from "./components/FadeInSection";
import SculptureVisual from "./components/SculptureVisual";

const TRUST_POINTS = ["5–8 分钟", "AI 个性化分析", "完全免费", "无需注册"];

const STEPS = [
  {
    number: "01",
    title: "回答 15 道真实关系场景",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="9" r="1.6" />
        <line x1="13" y1="9" x2="26" y2="9" strokeLinecap="round" />
        <circle cx="8" cy="16" r="1.6" />
        <line x1="13" y1="16" x2="26" y2="16" strokeLinecap="round" />
        <circle cx="8" cy="23" r="1.6" />
        <line x1="13" y1="23" x2="22" y2="23" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI 分析你的关系模式",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="16" cy="7" r="2.2" />
        <circle cx="7" cy="24" r="2.2" />
        <circle cx="25" cy="24" r="2.2" />
        <line x1="16" y1="9.2" x2="8" y2="22" strokeLinecap="round" />
        <line x1="16" y1="9.2" x2="24" y2="22" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "生成属于你的 Relationship Manual",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="8" y="4" width="16" height="24" rx="1.5" />
        <line x1="12" y1="11" x2="20" y2="11" strokeLinecap="round" />
        <line x1="12" y1="16" x2="20" y2="16" strokeLinecap="round" />
        <line x1="12" y1="21" x2="17" y2="21" strokeLinecap="round" />
      </svg>
    ),
  },
];

const TRUST_TAGS = ["AI based", "Evidence Inspired", "Private by Design"];

export default function Home() {
  return (
    <div className="flex flex-col bg-paper">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 pb-24 pt-20 md:flex-row md:gap-8 md:pb-32 md:pt-28">
        <div className="flex w-full animate-[fadeIn_0.6s_ease-in-out] flex-col items-start gap-6 md:w-1/2">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-lg italic text-clay">Rela</p>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Relationship Intelligence Platform</p>
          </div>

          <h1 className="font-heading text-4xl leading-tight text-ink md:text-5xl">
            每一段关系，
            <br />
            都值得一份说明书。
          </h1>

          <p className="text-base leading-relaxed text-ink-soft">
            15 道真实关系场景。AI 帮你生成属于自己的 Relationship Manual。
            <br />
            不是人格分类，不是打分，而是一份真正帮助你理解自己的说明书。
          </p>

          <Button href="/questionnaire" data-testid="hero-cta">
            开始探索
          </Button>

          <ul className="flex flex-col gap-2 pt-2 text-sm text-ink-soft">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/2">
          <SculptureVisual />
        </div>
      </section>

      {/* Mission */}
      <FadeInSection className="border-t border-hairline">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center md:py-32">
          <p className="font-heading text-2xl italic text-ink md:text-3xl">
            Relationship isn&apos;t luck.
            <br />
            It&apos;s a skill.
          </p>
          <p className="text-base text-ink-soft">关系不是运气。它是一种可以学习的能力。</p>
          <div className="mt-4 flex flex-col gap-2 text-base leading-relaxed text-ink-soft">
            <p>Rela 希望帮助每个人：</p>
            <p>理解自己 · 理解伴侣 · 共同雕塑一段长期关系</p>
          </div>
        </section>
      </FadeInSection>

      {/* How it Works */}
      <FadeInSection className="border-t border-hairline">
        <section className="mx-auto w-full max-w-4xl px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-start gap-4 rounded-2xl bg-card p-8">
                <span className="font-heading text-sm text-clay">{step.number}</span>
                <span className="text-clay">{step.icon}</span>
                <p className="text-base leading-relaxed text-ink">{step.title}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Trust */}
      <FadeInSection className="border-t border-hairline">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32">
          <p className="text-lg leading-relaxed text-ink">
            不是人格测试。不是 MBTI。不是恋爱打分。
            <br />
            而是一份真正帮助你理解自己的 Relationship Manual。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline px-4 py-1.5 text-xs uppercase tracking-wide text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection className="border-t border-hairline">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center md:py-32">
          <h2 className="font-heading text-3xl text-ink">开始理解，开始雕塑。</h2>
          <Button href="/questionnaire" data-testid="cta-bottom">
            生成我的说明书
          </Button>
        </section>
      </FadeInSection>
    </div>
  );
}
