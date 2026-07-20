// 对应 docs/REPORT_SYSTEM_PROMPT_V1.md 层5 Output Contract 的 JSON 结构（6模块版，prompt_version v2）。

export interface StandardModule {
  id: number; // 1-6
  title: string;
  conclusion: string;
  explanation: string;
  /** Module 1（你的关系画像）没有这两个字段，只写 conclusion+explanation。 */
  feelings?: string[];
  actions?: string[];
}

export interface ChangeModule extends StandardModule {
  id: 6;
  g1_alignment: string;
}

export type ReportModule = StandardModule | ChangeModule;

export interface Report {
  modules: ReportModule[];
  summary: string;
}

export function isChangeModule(m: ReportModule): m is ChangeModule {
  return typeof (m as ChangeModule).g1_alignment === "string";
}
