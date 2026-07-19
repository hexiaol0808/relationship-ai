"use client";

import { useState } from "react";
import type { Question, QuestionAnswer } from "@/lib/questions";
import OptionButton from "./OptionButton";
import FTextInput from "./FTextInput";

interface BestWorstTwoStepProps {
  question: Question;
  answer: QuestionAnswer | undefined;
  fText: string;
  onAnswerChange: (value: QuestionAnswer | undefined) => void;
  onFTextChange: (text: string) => void;
}

export default function BestWorstTwoStep({
  question,
  answer,
  fText,
  onAnswerChange,
  onFTextChange,
}: BestWorstTwoStepProps) {
  const initialFirst = answer && "first" in answer ? answer.first : undefined;
  const [pendingFirst, setPendingFirst] = useState<string | undefined>(initialFirst);

  const step1Choices = question.hasF
    ? [...question.options, { letter: "F", body: question.fPrompt ?? "其他选项，请输入" }]
    : question.options;

  function pickFirst(letter: string) {
    setPendingFirst(letter);
    onAnswerChange(undefined);
  }

  function pickSecond(letter: string) {
    if (!pendingFirst) return;
    onAnswerChange({ first: pendingFirst, second: letter });
  }

  function reset() {
    setPendingFirst(undefined);
    onAnswerChange(undefined);
  }

  if (!pendingFirst) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-rose-gold-dark">{question.step1Label ?? "请选择最符合的一项："}</p>
        {step1Choices.map((opt) => (
          <OptionButton
            key={opt.letter}
            letter={opt.letter}
            title={"title" in opt ? opt.title : undefined}
            body={opt.body}
            selected={false}
            onClick={() => pickFirst(opt.letter)}
          />
        ))}
      </div>
    );
  }

  // 第二步永远只在 A-E 这五个正式选项里选：若第一步选的是字母，排除该字母；若第一步选了 F，五项全保留。
  const secondChoices = question.options.filter((opt) => opt.letter !== pendingFirst);
  const secondLetter = answer && "second" in answer ? answer.second : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl bg-blush/60 p-4">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-gold text-xs font-medium text-white">
          {pendingFirst}
        </span>
        <span className="flex-1 px-3 text-sm text-zinc-600">第一步已选</span>
        <button type="button" onClick={reset} className="text-xs text-rose-gold-dark underline">
          重新选择
        </button>
      </div>

      {pendingFirst === "F" && (
        <FTextInput prompt={question.fPrompt ?? "请输入"} value={fText} onChange={onFTextChange} />
      )}

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-rose-gold-dark">
          {question.step2Label ?? "在剩下的选项里，哪一项是你相对更能适应的？"}
        </p>
        {question.step2Hint && <p className="text-xs text-zinc-400">{question.step2Hint}</p>}
      </div>
      <div className="flex flex-col gap-3">
        {secondChoices.map((opt) => (
          <OptionButton
            key={opt.letter}
            letter={opt.letter}
            title={opt.title}
            body={opt.body}
            selected={secondLetter === opt.letter}
            onClick={() => pickSecond(opt.letter)}
          />
        ))}
      </div>
    </div>
  );
}
