"use client";

import type { Question, QuestionAnswer } from "@/lib/questions";
import OptionButton from "./OptionButton";
import FTextInput from "./FTextInput";

interface SingleChoiceProps {
  question: Question;
  answer: QuestionAnswer | undefined;
  fText: string;
  onAnswerChange: (value: QuestionAnswer | undefined) => void;
  onFTextChange: (text: string) => void;
}

export default function SingleChoice({ question, answer, fText, onAnswerChange, onFTextChange }: SingleChoiceProps) {
  const selected = answer && "value" in answer ? answer.value : undefined;

  return (
    <div className="flex flex-col gap-3">
      {question.options.map((opt) => (
        <OptionButton
          key={opt.letter}
          letter={opt.letter}
          title={opt.title}
          body={opt.body}
          selected={selected === opt.letter}
          onClick={() => onAnswerChange({ value: opt.letter })}
        />
      ))}

      {question.hasF && (
        <>
          <OptionButton
            letter="F"
            body={question.fPrompt ?? "其他，请自行输入"}
            selected={selected === "F"}
            onClick={() => onAnswerChange({ value: "F" })}
          />
          {selected === "F" && (
            <FTextInput prompt={question.fPrompt ?? "请输入"} value={fText} onChange={onFTextChange} />
          )}
        </>
      )}
    </div>
  );
}
