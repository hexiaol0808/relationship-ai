import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
            你的亲密关系说明书
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            15 道场景化选择题，帮你看清自己在关系中真正需要什么、怎样爱与被爱、以及下一次可以在哪里做得不一样。
            <br />
            不是人格分类，不是诊断，只是一份更了解自己的说明书。
          </p>
        </div>
        <Link
          href="/questionnaire"
          className="flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          开始测试
        </Link>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">完全免费，约需 5-8 分钟，无需注册</p>
      </main>
    </div>
  );
}
