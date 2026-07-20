"use client";

interface FTextInputProps {
  prompt: string;
  value: string;
  onChange: (text: string) => void;
}

export default function FTextInput({ prompt, value, onChange }: FTextInputProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-clay/40 p-4">
      <span className="text-sm text-ink-soft">{prompt}</span>
      <textarea
        data-testid="f-text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="请输入（可以留空）"
        className="w-full resize-none rounded-lg border border-hairline bg-card p-3 text-sm text-ink outline-none focus:border-clay"
      />
    </div>
  );
}
