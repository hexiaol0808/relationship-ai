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
        selected ? "border-rose-gold bg-blush/60" : "border-zinc-200 bg-white hover:border-rose-gold/50"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
          selected ? "bg-rose-gold text-white" : "bg-blush text-rose-gold-dark"
        }`}
      >
        {letter}
      </span>
      <span className="flex flex-col gap-1">
        {title && <span className="font-medium text-zinc-800">{title}</span>}
        <span className="text-sm leading-relaxed text-zinc-600">{body}</span>
      </span>
    </button>
  );
}
