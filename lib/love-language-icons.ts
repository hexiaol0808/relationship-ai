// CP1/CP2 共用的五种爱的语言，标题到 emoji 的映射。
// 用于报告页模块2的图标条、Relationship Card、分享卡片。

import { getQuestion, type Answers, type Question, type QuestionAnswer } from "./questions";

const ICONS: Record<string, string> = {
  高质量陪伴: "☕",
  肯定的话语: "💬",
  服务的行动: "🤝",
  礼物与纪念: "🎁",
  身体接触: "🤗",
};

export function iconForTitle(title: string | undefined): string {
  if (!title) return "💛";
  return ICONS[title] ?? "💛";
}

export interface LoveLanguagePick {
  letter: string;
  title: string;
}

function picksFor(ans: QuestionAnswer | undefined, question: Question): LoveLanguagePick[] {
  if (!ans || !("first" in ans)) return [];
  return [ans.first, ans.second].map((letter) => {
    const opt = question.options.find((o) => o.letter === letter);
    return { letter, title: opt?.title ?? letter };
  });
}

/** CP1：你最容易感受到爱的方式（第一/第二优先） */
export function cp1Picks(answers: Answers): LoveLanguagePick[] {
  return picksFor(answers["q1"], getQuestion(1));
}

/** CP2：你最自然的表达方式（第一/第二优先） */
export function cp2Picks(answers: Answers): LoveLanguagePick[] {
  return picksFor(answers["q2"], getQuestion(2));
}
