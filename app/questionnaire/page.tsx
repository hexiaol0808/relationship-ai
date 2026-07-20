"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, type Answers, type FTextInputs, type Question, type QuestionAnswer } from "@/lib/questions";
import Button from "@/app/components/Button";
import SingleChoice from "./components/SingleChoice";
import RankedTwo from "./components/RankedTwo";
import BestWorstTwoStep from "./components/BestWorstTwoStep";
import GeneratingScreen from "./components/GeneratingScreen";

const TOTAL_STEPS = QUESTIONS.length + 1; // 最后一步是邮箱+提交

function QuestionRenderer(props: {
  question: Question;
  answer: QuestionAnswer | undefined;
  fText: string;
  onAnswerChange: (value: QuestionAnswer | undefined) => void;
  onFTextChange: (text: string) => void;
}) {
  const { question } = props;
  if (question.type === "single_f" || question.type === "single_no_f") {
    return <SingleChoice {...props} />;
  }
  if (question.type === "best_worst_two_step") {
    return <BestWorstTwoStep {...props} />;
  }
  return <RankedTwo {...props} />;
}

export default function QuestionnairePage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [fTextInputs, setFTextInputs] = useState<FTextInputs>({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFinalStep = stepIndex === QUESTIONS.length;
  const question = isFinalStep ? undefined : QUESTIONS[stepIndex];
  const key = question ? `q${question.id}` : undefined;

  function setAnswer(k: string, value: QuestionAnswer | undefined) {
    setAnswers((prev) => {
      const next = { ...prev };
      if (value === undefined) delete next[k];
      else next[k] = value;
      return next;
    });
  }

  function setFText(k: string, text: string) {
    setFTextInputs((prev) => ({ ...prev, [k]: text }));
  }

  const canProceed = isFinalStep ? true : key !== undefined && answers[key] !== undefined;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          f_text_inputs: fTextInputs,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "生成失败，请重试");
      router.push(`/report/${data.report_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请重试");
      setSubmitting(false);
    }
  }

  if (submitting) {
    return <GeneratingScreen />;
  }

  return (
    <div className="min-h-dvh bg-paper px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-secondary">
            <div
              className="h-full rounded-full bg-clay transition-all"
              style={{ width: `${((stepIndex + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <p className="text-xs text-ink-soft">
            {isFinalStep ? "最后一步" : `第 ${stepIndex + 1} / ${QUESTIONS.length} 题`}
          </p>
        </div>

        {!isFinalStep && question && key && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl leading-snug text-ink">{question.title}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">{question.prompt}</p>
            </div>
            <QuestionRenderer
              key={question.id}
              question={question}
              answer={answers[key]}
              fText={fTextInputs[key] ?? ""}
              onAnswerChange={(v) => setAnswer(key, v)}
              onFTextChange={(t) => setFText(key, t)}
            />
          </div>
        )}

        {isFinalStep && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl leading-snug text-ink">最后一步：留个邮箱（可选）</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                填了邮箱可以在未来找回这份报告，不填也完全没问题，直接点提交就好。
              </p>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com（可选）"
              className="w-full rounded-2xl border border-hairline bg-card p-4 text-sm text-ink outline-none focus:border-clay"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            className="flex h-12 items-center justify-center rounded-full border border-clay/40 px-6 text-sm font-medium text-clay-dark disabled:opacity-0"
          >
            上一题
          </button>
          {isFinalStep ? (
            <Button data-testid="submit-button" onClick={handleSubmit} fullWidth className="flex-1">
              提交，生成我的报告
            </Button>
          ) : (
            <Button data-testid="next-button" onClick={() => setStepIndex((i) => Math.min(QUESTIONS.length, i + 1))} disabled={!canProceed} fullWidth className="flex-1">
              下一题
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
