import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// HarmonyOS Sans / MiSans / 阿里巴巴普惠体是厂商私有字体，无法通过 Google Fonts 合法获取。
// Noto Sans SC / Noto Serif SC 分别是思源黑体 / 思源宋体的 Google Fonts 版本
// （Adobe/Google 联合开发，同一套字库），作为正文/标题中文替代。

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rela · Relationship Intelligence Platform",
  description: "15 道真实关系场景，AI 帮你生成属于自己的 Relationship Manual。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSansSC.variable} ${cormorantGaramond.variable} ${notoSerifSC.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
