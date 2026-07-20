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
        selected ? "border-clay bg-card" : "border-hairline bg-card hover:border-clay/50"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
          selected ? "bg-clay text-white" : "bg-paper-secondary text-clay-dark"
        }`}
      >
        {letter}
      </span>
      <span className="flex flex-col gap-1">
        {title && <span className="font-medium text-ink">{title}</span>}
        <span className="text-sm leading-relaxed text-ink-soft">{body}</span>
      </span>
    </button>
  );
}
