"use client";

import { useState } from "react";
import type { Question, QuestionAnswer } from "@/lib/questions";
import OptionButton from "./OptionButton";
import FTextInput from "./FTextInput";

interface RankedTwoProps {
  question: Question;
  answer: QuestionAnswer | undefined;
  fText: string;
  onAnswerChange: (value: QuestionAnswer | undefined) => void;
  onFTextChange: (text: string) => void;
}

export default function RankedTwo({ question, answer, fText, onAnswerChange, onFTextChange }: RankedTwoProps) {
  const initialFirst = answer && "first" in answer ? answer.first : undefined;
  const [pendingFirst, setPendingFirst] = useState<string | undefined>(initialFirst);

  const choices = question.hasF
    ? [...question.options, { letter: "F", body: question.fPrompt ?? "其他，请自行输入" }]
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
        <p className="text-sm font-medium text-rose-gold-dark">{question.firstLabel ?? "第一优先"}</p>
        {choices.map((opt) => (
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

  const remaining = choices.filter((opt) => opt.letter !== pendingFirst);
  const chosenFirst = choices.find((opt) => opt.letter === pendingFirst);
  const secondLetter = answer && "second" in answer ? answer.second : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl bg-blush/60 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-gold text-xs font-medium text-white">
            {pendingFirst}
          </span>
          <span className="text-sm font-medium text-zinc-800">
            {("title" in (chosenFirst ?? {}) ? (chosenFirst as { title?: string }).title : undefined) ?? "已选"}
          </span>
        </div>
        <button type="button" onClick={reset} className="text-xs text-rose-gold-dark underline">
          重新选择
        </button>
      </div>

      {pendingFirst === "F" && (
        <FTextInput prompt={question.fPrompt ?? "请输入"} value={fText} onChange={onFTextChange} />
      )}

      <p className="text-sm font-medium text-rose-gold-dark">{question.secondLabel ?? "第二优先"}</p>
      <div className="flex flex-col gap-3">
        {remaining.map((opt) => (
          <OptionButton
            key={opt.letter}
            letter={opt.letter}
            title={"title" in opt ? opt.title : undefined}
            body={opt.body}
            selected={secondLetter === opt.letter}
            onClick={() => pickSecond(opt.letter)}
          />
        ))}
      </div>

      {secondLetter === "F" && (
        <FTextInput prompt={question.fPrompt ?? "请输入"} value={fText} onChange={onFTextChange} />
      )}
    </div>
  );
}
