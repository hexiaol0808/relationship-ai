/**
 * 展示前的兜底清理：prompt 已经明确禁止模型输出构念代码/变量名，这里再扫一遍正则去掉可能的残留，
 * 不依赖模型 100% 听话。CP1-5/S1-10/G1-8/V1-7 这几类代码前后必须是非字母数字边界，
 * 避免误伤正常词语（中文文本里几乎不会出现这些字母数字组合，误伤概率极低）。
 */
export function stripConstructCodes(text: string): string {
  return text
    .replace(/\b(CP[1-5]|S(?:10|[1-9])|G[1-8]|V[1-7])\b/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
