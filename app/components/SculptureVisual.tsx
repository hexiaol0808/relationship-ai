export default function SculptureVisual() {
  return (
    <div className="flex w-full items-center justify-center animate-[float_7s_ease-in-out_infinite]">
      <svg viewBox="0 0 400 480" className="h-auto w-full max-w-[220px] md:max-w-sm" aria-hidden="true">
        {/* 后景：大拱门轮廓 */}
        <path d="M70 470 L70 180 A130 130 0 0 1 330 180 L330 470 Z" className="fill-paper-secondary" />
        {/* 中景：圆形量体，制造进深 */}
        <circle cx="270" cy="330" r="90" className="fill-clay/15" />
        {/* 前景：较小的拱门量体，偏移叠加 */}
        <path
          d="M40 470 L40 260 A95 95 0 0 1 230 260 L230 470 Z"
          className="fill-card"
          stroke="var(--color-hairline)"
          strokeWidth="1.5"
        />
        {/* 细节：一道竖线，呼应雕塑刻痕 */}
        <line x1="135" y1="300" x2="135" y2="440" stroke="var(--color-clay)" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}
