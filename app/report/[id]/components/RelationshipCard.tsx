import type { Answers } from "@/lib/questions";
import { cp1Picks } from "@/lib/love-language-icons";
import type { ReportModule } from "@/lib/report-types";
import { stripConstructCodes } from "@/lib/text";

interface RelationshipCardProps {
  summary: string;
  answers: Answers;
  modules: ReportModule[];
}

export default function RelationshipCard({ summary, answers, modules }: RelationshipCardProps) {
  const keywords = cp1Picks(answers);
  const byId = (id: number) => modules.find((m) => m.id === id);

  const summaryCards = [
    { label: "你如何感受到爱", text: byId(2)?.conclusion },
    { label: "什么最容易消耗你", text: byId(3)?.conclusion },
    { label: "你可以如何表达需要", text: byId(5)?.conclusion },
  ].filter((c): c is { label: string; text: string } => Boolean(c.text));

  return (
    <div className="flex animate-[fadeIn_0.6s_ease-in-out] flex-col gap-6 rounded-3xl border border-hairline bg-card p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-heading text-xl italic text-clay">Rela</p>
        <h1 className="font-heading text-[32px] leading-snug text-ink">你的关系说明书</h1>
      </div>

      {keywords.length > 0 && (
        <div className="flex flex-col items-center gap-2.5">
          <p className="text-sm font-medium text-clay-dark">你的关系关键词</p>
          <div className="flex flex-wrap justify-center gap-2">
            {keywords.map((k) => (
              <span
                key={k.letter}
                className="rounded-full border border-hairline bg-paper px-4 py-1.5 text-sm text-ink-body"
              >
                {k.title}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-medium text-clay-dark">你最核心的关系需要</p>
        <blockquote className="font-heading text-xl leading-relaxed text-ink">
          “{stripConstructCodes(summary)}”
        </blockquote>
      </div>

      {summaryCards.length > 0 && (
        <div className="flex flex-col gap-3">
          {summaryCards.map((c) => (
            <div key={c.label} className="rounded-2xl bg-paper-secondary p-4">
              <p className="text-sm font-medium text-clay-dark">{c.label}</p>
              <p className="mt-1 text-base leading-relaxed text-ink-body">{stripConstructCodes(c.text)}</p>
            </div>
          ))}
        </div>
      )}

      <a
        href="#full-report"
        className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-clay px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-clay-dark"
      >
        查看完整报告 ↓
      </a>
    </div>
  );
}
