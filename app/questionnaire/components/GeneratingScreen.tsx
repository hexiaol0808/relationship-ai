"use client";

import { useEffect, useState } from "react";

const SCENES = [
  { emoji: "🐶　　🐶", caption: "第一次相遇" },
  { emoji: "🐶🚶🐕", caption: "一起散步" },
  { emoji: "🐶💢🐶", caption: "发生争执" },
  { emoji: "🐶　　🐶", caption: "背对背坐着" },
  { emoji: "🐶→🐶", caption: "其中一只慢慢靠近" },
  { emoji: "🐶🤗🐶", caption: "抱抱" },
  { emoji: "🐕🐶→", caption: "一起走向远方" },
];

const STATUS_MESSAGES = [
  "正在分析你的情感需求...",
  "正在寻找你的安全感来源...",
  "正在建立关系运行地图...",
  "正在整理成长建议...",
];

const SCENE_INTERVAL_MS = 2500;
const STATUS_INTERVAL_MS = 2000;

export default function GeneratingScreen() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSceneIndex((i) => (i + 1) % SCENES.length);
    }, SCENE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, STATUS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const scene = SCENES[sceneIndex];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-gradient-to-b from-cream to-blush px-6 text-center">
      <p className="text-lg font-medium text-rose-gold-dark">Rela 正在深入理解你</p>

      <div key={`scene-${sceneIndex}`} className="flex flex-col items-center gap-3 animate-[fadeIn_0.5s_ease-in-out]">
        <div className="text-6xl leading-none">{scene.emoji}</div>
        <p className="text-sm text-rose-gold-dark/80">{scene.caption}</p>
      </div>

      <p className="text-base font-medium text-zinc-800">❤️ 正在生成你的关系说明书……</p>

      <p key={`status-${statusIndex}`} className="text-sm text-zinc-500 animate-[fadeIn_0.4s_ease-in-out]">
        {STATUS_MESSAGES[statusIndex]}
      </p>

      <p className="mt-4 text-xs text-zinc-400">请不要关闭页面，大约需要 10-30 秒</p>
    </div>
  );
}
