// 对应 docs/REPORT_SYSTEM_PROMPT_V1.md 层5 Output Contract 的 JSON 结构。

export interface StandardModule {
  id: number; // 1-8
  title: string;
  body: string;
}

export interface Tension {
  type: string;
  body: string;
}

export interface TensionsModule {
  id: 9;
  title: string;
  tensions: Tension[];
  /** tensions 为空数组时，模型会在这里写一句"内部一致性较高"之类的说明。 */
  body?: string;
}

export interface ChangeModule {
  id: 10;
  title: string;
  g1_alignment: string;
  insight: string;
  function: string;
  cost: string;
  practice: string;
  review: string;
}

export type ReportModule = StandardModule | TensionsModule | ChangeModule;

export interface Report {
  modules: ReportModule[];
  summary: string;
}

export function isTensionsModule(m: ReportModule): m is TensionsModule {
  return Array.isArray((m as TensionsModule).tensions);
}

export function isChangeModule(m: ReportModule): m is ChangeModule {
  return typeof (m as ChangeModule).g1_alignment === "string";
}
