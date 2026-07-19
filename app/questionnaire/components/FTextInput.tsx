"use client";

interface FTextInputProps {
  prompt: string;
  value: string;
  onChange: (text: string) => void;
}

export default function FTextInput({ prompt, value, onChange }: FTextInputProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{prompt}</span>
      <textarea
        data-testid="f-text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="请输入（可以留空）"
        className="w-full resize-none rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
      />
    </div>
  );
}
