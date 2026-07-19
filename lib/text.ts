/**
 * 按中文句末标点（。！？）把一段文字切成句子，每 sentencesPerChunk 句归一段。
 * 只做纯前端展示层的分段，不改变原文字内容。
 */
export function splitIntoParagraphs(body: string, sentencesPerChunk = 2): string[] {
  const sentences = body
    .split(/(?<=[。！？])/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return [];

  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
    paragraphs.push(sentences.slice(i, i + sentencesPerChunk).join(""));
  }
  return paragraphs;
}
