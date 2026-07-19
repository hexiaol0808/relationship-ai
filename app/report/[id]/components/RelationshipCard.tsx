import type { Answers } from "@/lib/questions";
import { cp1Picks, iconForTitle } from "@/lib/love-language-icons";

interface RelationshipCardProps {
  summary: string;
  answers: Answers;
}

export default function RelationshipCard({ summary, answers }: RelationshipCardProps) {
  const chips = cp1Picks(answers);

  return (
    <div className="flex animate-[fadeIn_0.6s_ease-in-out] flex-col items-center gap-5 rounded-3xl bg-gradient-to-br from-cream via-blush to-peach p-8 text-center shadow-sm">
      <p className="text-xl font-semibold text-zinc-800">你的关系说明书</p>

      <div className="h-px w-20 bg-rose-gold" />

      <div className="text-4xl">❤️</div>

      {chips.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <span
              key={c.letter}
              className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm text-zinc-700"
            >
              <span>{iconForTitle(c.title)}</span>
              <span>{c.title}</span>
            </span>
          ))}
        </div>
      )}

      <div className="h-px w-20 bg-rose-gold" />

      <div className="flex flex-col gap-2">
        <p className="text-sm text-rose-gold-dark">你在关系中：</p>
        <p className="text-lg font-medium leading-relaxed text-zinc-800">“{summary}”</p>
      </div>

      <div className="h-px w-20 bg-rose-gold" />

      <p className="text-xs text-rose-gold-dark">来自 · Rela 关系雕塑家</p>

      <a
        href="#full-report"
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-rose-gold px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-rose-gold-dark"
      >
        查看完整报告 ↓
      </a>
    </div>
  );
}
