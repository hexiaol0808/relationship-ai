import type { Answers } from "@/lib/questions";
import { cp1Picks, iconForTitle } from "@/lib/love-language-icons";

interface RelationshipCardProps {
  summary: string;
  answers: Answers;
}

export default function RelationshipCard({ summary, answers }: RelationshipCardProps) {
  const chips = cp1Picks(answers);

  return (
    <div className="flex animate-[fadeIn_0.6s_ease-in-out] flex-col items-center gap-5 rounded-3xl border border-hairline bg-card p-8 text-center shadow-sm">
      <p className="font-heading text-xl text-ink">你的关系说明书</p>

      <div className="h-px w-20 bg-clay" />

      <p className="font-heading text-2xl italic text-clay">Rela</p>

      {chips.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <span
              key={c.letter}
              className="flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-sm text-ink-soft"
            >
              <span>{iconForTitle(c.title)}</span>
              <span>{c.title}</span>
            </span>
          ))}
        </div>
      )}

      <div className="h-px w-20 bg-clay" />

      <div className="flex flex-col gap-2">
        <p className="text-sm text-clay-dark">你在关系中：</p>
        <p className="font-heading text-lg leading-relaxed text-ink">“{summary}”</p>
      </div>

      <div className="h-px w-20 bg-clay" />

      <p className="text-xs uppercase tracking-wide text-clay-dark">Rela · 关系雕塑家</p>

      <a
        href="#full-report"
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-clay px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-clay-dark"
      >
        查看完整报告 ↓
      </a>
    </div>
  );
}
