"use client";

interface OptionButtonProps {
  letter: string;
  title?: string;
  body: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionButton({ letter, title, body, selected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      data-testid="option-button"
      data-letter={letter}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-zinc-900 bg-zinc-100 dark:border-zinc-50 dark:bg-zinc-900"
          : "border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
          selected
            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black"
            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        }`}
      >
        {letter}
      </span>
      <span className="flex flex-col gap-1">
        {title && <span className="font-medium text-zinc-900 dark:text-zinc-50">{title}</span>}
        <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</span>
      </span>
    </button>
  );
}
