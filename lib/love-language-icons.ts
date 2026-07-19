// CP1/CP2 共用的五种爱的语言，标题到 emoji 的映射。
// 用于报告页模块2的图标条和分享卡片。

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
