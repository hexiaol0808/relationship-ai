interface SculptureVisualProps {
  stage?: 1 | 2 | 3;
  className?: string;
}

export default function SculptureVisual({ stage = 3, className = "" }: SculptureVisualProps) {
  return (
    <div className={`flex w-full items-center justify-center animate-[float_7s_ease-in-out_infinite] ${className}`}>
      <svg viewBox="0 0 400 480" className="h-auto w-full max-w-[220px] md:max-w-sm" aria-hidden="true">
        {stage === 1 && (
          // 尚未雕琢的抽象石块：一整块不规则量体，没有结构
          <path
            d="M120 460 L90 340 L110 220 L170 130 L260 110 L320 190 L310 320 L340 420 L260 460 L180 470 Z"
            className="fill-paper-secondary"
            stroke="var(--color-hairline)"
            strokeWidth="1.5"
          />
        )}

        {stage === 2 && (
          <>
            {/* 石块仍在，但轮廓开始规整 */}
            <path
              d="M110 460 L90 320 L120 200 L180 130 L260 130 L310 210 L300 340 L320 430 L240 465 L160 470 Z"
              className="fill-paper-secondary"
            />
            {/* 拱门结构开始浮现 */}
            <path
              d="M70 470 L70 200 A130 130 0 0 1 330 200 L330 470"
              fill="none"
              stroke="var(--color-clay)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            {/* 连接线：结构与结构之间开始咬合 */}
            <line x1="200" y1="220" x2="200" y2="440" stroke="var(--color-clay)" strokeWidth="1" opacity="0.4" />
          </>
        )}

        {stage === 3 && (
          <>
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
          </>
        )}
      </svg>
    </div>
  );
}
