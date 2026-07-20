"use client";

import type { ReactNode } from "react";
import { isChangeModule, type ReportModule } from "@/lib/report-types";
import type { Answers } from "@/lib/questions";
import { cp1Picks, cp2Picks } from "@/lib/love-language-icons";
import { stripConstructCodes } from "@/lib/text";

interface ReportModulesProps {
  modules: ReportModule[];
  answers: Answers;
}

function LoveLanguageChips({ answers }: { answers: Answers }) {
  const cp1Chips = cp1Picks(answers);
  const cp2Chips = cp2Picks(answers);

  if (cp1Chips.length === 0 && cp2Chips.length === 0) return null;

  const rows: Array<{ label: string; chips: { letter: string; title: string }[] }> = [
    { label: "你最容易感受到爱的方式", chips: cp1Chips },
    { label: "你最自然的表达方式", chips: cp2Chips },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-paper-secondary p-4">
      {rows.map(
        (row) =>
          row.chips.length > 0 && (
            <div key={row.label} className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-clay-dark">{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {row.chips.map((c) => (
                  <span key={c.letter} className="rounded-full bg-card px-3 py-1 text-sm text-ink-body">
                    {c.title}
                  </span>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}

function AccordionItem({
  title,
  defaultOpen,
  children,
}: {
  title: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group rounded-2xl border border-hairline bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <span className="font-heading text-2xl font-bold text-ink">{title}</span>
        <svg
          className="h-4 w-4 shrink-0 text-clay-dark/60 transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="flex flex-col gap-4 px-5 pb-5">{children}</div>
    </details>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-base leading-relaxed text-ink-body">
          <span className="text-clay">·</span>
          <span>{stripConstructCodes(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function ModuleContent({ module: m }: { module: ReportModule }) {
  return (
    <>
      <p className="text-lg font-bold text-ink">{stripConstructCodes(m.conclusion)}</p>
      <p className="text-base leading-relaxed text-ink-body">{stripConstructCodes(m.explanation)}</p>

      {m.feelings && m.feelings.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-clay-dark">你可能会有的感受</p>
          <BulletList items={m.feelings} />
        </div>
      )}

      {m.actions && m.actions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-clay-dark">对你有帮助的行动</p>
          <BulletList items={m.actions} />
        </div>
      )}
    </>
  );
}

export default function ReportModules({ modules, answers }: ReportModulesProps) {
  return (
    <div className="flex flex-col gap-4">
      {modules.map((m) => {
        const title = isChangeModule(m) ? (
          <span className="flex items-center gap-2">
            {m.title}
            <span className="rounded-full bg-clay px-3 py-1 text-xs font-medium text-white">{m.g1_alignment}</span>
          </span>
        ) : (
          m.title
        );

        return (
          <AccordionItem key={m.id} title={title} defaultOpen={m.id === 1}>
            {m.id === 2 && <LoveLanguageChips answers={answers} />}
            <ModuleContent module={m} />
          </AccordionItem>
        );
      })}
    </div>
  );
}
