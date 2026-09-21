import { Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { HighlightSpec } from "../captionTypes";

const Pulse: React.FC<{ xPct: number; yPct: number; durationFrames: number }> = ({
  xPct,
  yPct,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / durationFrames, 1);

  // Subtle growth only: the ring barely expands instead of blooming outward.
  const ringScale = interpolate(progress, [0, 1], [0.7, 1.35], {
    easing: Easing.out(Easing.cubic),
  });
  const ringOpacity = interpolate(progress, [0, 0.12, 0.7, 1], [0, 0.9, 0.4, 0]);
  const dotOpacity = interpolate(progress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const dotScale = interpolate(progress, [0, 0.15], [0.5, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const size = 72;

  return (
    <div
      style={{
        position: "absolute",
        left: `${xPct}%`,
        top: `${yPct}%`,
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          left: -size / 2,
          top: -size / 2,
          borderRadius: "50%",
          border: "4px solid #FFC55C",
          boxShadow: "0 0 18px 2px rgba(255, 197, 92, 0.55)",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: size * 0.34,
          height: size * 0.34,
          left: (-size * 0.34) / 2,
          top: (-size * 0.34) / 2,
          borderRadius: "50%",
          background: "#FFC55C",
          boxShadow: "0 0 12px 2px rgba(255, 197, 92, 0.8)",
          transform: `scale(${dotScale})`,
          opacity: dotOpacity,
        }}
      />
    </div>
  );
};

const PointArrow: React.FC<{
  xPct: number;
  yPct: number;
  durationFrames: number;
  angleDeg: number;
  length: number;
}> = ({ xPct, yPct, durationFrames, angleDeg, length }) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / durationFrames, 1);

  const fadeIn = interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(progress, [0.8, 1], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  // A small bob toward the target, back and forth, to draw the eye.
  const bob = interpolate(
    progress % 0.5,
    [0, 0.25, 0.5],
    [0, length * 0.08, 0],
    { easing: Easing.inOut(Easing.quad) },
  );

  const headSize = 14;

  return (
    <div
      style={{
        position: "absolute",
        left: `${xPct}%`,
        top: `${yPct}%`,
        width: 0,
        height: 0,
        opacity,
        pointerEvents: "none",
      }}
    >
      <svg
        width={length + headSize * 2}
        height={headSize * 4}
        style={{
          position: "absolute",
          overflow: "visible",
          transform: `rotate(${angleDeg}deg) translateX(${bob}px)`,
          transformOrigin: "0px 0px",
        }}
      >
        <line
          x1={headSize * 0.6}
          y1={0}
          x2={length}
          y2={0}
          stroke="#FFC55C"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <polygon
          points={`0,0 ${headSize},${-headSize * 0.6} ${headSize},${headSize * 0.6}`}
          fill="#FFC55C"
        />
      </svg>
    </div>
  );
};

export const TapPulses: React.FC<{ highlights?: HighlightSpec[] }> = ({ highlights }) => {
  const { fps } = useVideoConfig();
  const sec = (s: number) => Math.round(s * fps);

  if (!highlights || highlights.length === 0) return null;

  return (
    <>
      {highlights.map((h, i) => {
        const durationFrames = sec(h.duration);
        return (
          <Sequence key={i} from={sec(h.from)} durationInFrames={durationFrames} layout="none">
            {h.type === "arrow" ? (
              <PointArrow
                xPct={h.xPct}
                yPct={h.yPct}
                durationFrames={durationFrames}
                angleDeg={h.angleDeg ?? 135}
                length={h.length ?? 70}
              />
            ) : (
              <Pulse xPct={h.xPct} yPct={h.yPct} durationFrames={durationFrames} />
            )}
          </Sequence>
        );
      })}
    </>
  );
};
