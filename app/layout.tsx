import type { Metadata } from "next";
import { Noto_Sans_SC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// HarmonyOS Sans / MiSans / 阿里巴巴普惠体是厂商私有字体，无法通过 Google Fonts 合法获取。
// Noto Sans SC 是思源黑体的 Google Fonts 版本（Adobe/Google 联合开发，同一套字库），作为中文替代。
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

export const metadata: Metadata = {
  title: "Rela · 你的亲密关系说明书",
  description: "15 道场景化选择题，帮你看清自己在关系中真正需要什么、怎样爱与被爱。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} ${cormorantGaramond.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
