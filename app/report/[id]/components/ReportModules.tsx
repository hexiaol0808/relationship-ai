"use client";

import type { ReactNode } from "react";
import { isChangeModule, isTensionsModule, type ReportModule } from "@/lib/report-types";
import type { Answers } from "@/lib/questions";
import { cp1Picks, cp2Picks, iconForTitle } from "@/lib/love-language-icons";
import { splitIntoParagraphs } from "@/lib/text";

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
    <div className="flex flex-col gap-3 rounded-xl bg-blush/50 p-4">
      {rows.map(
        (row) =>
          row.chips.length > 0 && (
            <div key={row.label} className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-rose-gold-dark">{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {row.chips.map((c) => (
                  <span
                    key={c.letter}
                    className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm text-zinc-700"
                  >
                    <span>{iconForTitle(c.title)}</span>
                    <span>{c.title}</span>
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
    <details open={defaultOpen} className="group rounded-2xl border border-zinc-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <span className="text-base font-semibold text-zinc-800">{title}</span>
        <svg
          className="h-4 w-4 shrink-0 text-rose-gold-dark/60 transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="flex flex-col gap-3 px-5 pb-5">{children}</div>
    </details>
  );
}

function ModuleBody({ body }: { body: string }) {
  const paragraphs = splitIntoParagraphs(body);
  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-loose text-zinc-600">
          {p}
        </p>
      ))}
    </div>
  );
}

const CHANGE_FIELDS: Array<[string, "function" | "cost" | "practice" | "review"]> = [
  ["为什么会这样", "function"],
  ["什么时候会开始失效", "cost"],
  ["可以试试", "practice"],
  ["7-14天后回顾", "review"],
];

export default function ReportModules({ modules, answers }: ReportModulesProps) {
  return (
    <div className="flex flex-col gap-4">
      {modules.map((m) => {
        const defaultOpen = m.id === 1 || m.id === 10;

        if (isTensionsModule(m)) {
          return (
            <AccordionItem key={m.id} title={m.title} defaultOpen={defaultOpen}>
              {m.tensions.length === 0 ? (
                <p className="text-base leading-loose text-zinc-600">{m.body}</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {m.tensions.map((t, i) => (
                    <li key={i} className="rounded-xl bg-blush/40 p-4 text-base leading-loose text-zinc-700">
                      {t.body}
                    </li>
                  ))}
                </ul>
              )}
            </AccordionItem>
          );
        }

        if (isChangeModule(m)) {
          return (
            <AccordionItem
              key={m.id}
              defaultOpen={defaultOpen}
              title={
                <span className="flex items-center gap-2">
                  {m.title}
                  <span className="rounded-full bg-rose-gold px-3 py-1 text-xs font-medium text-white">
                    {m.g1_alignment}
                  </span>
                </span>
              }
            >
              <p className="text-base leading-loose text-zinc-800">{m.insight}</p>
              <dl className="flex flex-col gap-4 text-base">
                {CHANGE_FIELDS.map(([label, field]) => (
                  <div key={field}>
                    <dt className="text-sm font-medium text-rose-gold-dark">{label}</dt>
                    <dd className="mt-1 leading-loose text-zinc-700">{m[field]}</dd>
                  </div>
                ))}
              </dl>
            </AccordionItem>
          );
        }

        return (
          <AccordionItem key={m.id} title={m.title} defaultOpen={defaultOpen}>
            {m.id === 2 && <LoveLanguageChips answers={answers} />}
            <ModuleBody body={m.body} />
          </AccordionItem>
        );
      })}
    </div>
  );
}
