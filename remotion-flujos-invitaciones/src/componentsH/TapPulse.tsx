import { Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { HighlightSpec } from "../captionTypes";

const Pulse: React.FC<{ xPct: number; yPct: number; durationFrames: number }> = ({
  xPct,
  yPct,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / durationFrames, 1);

  const ringScale = interpolate(progress, [0, 1], [0.4, 2.4], {
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

export const TapPulses: React.FC<{ highlights?: HighlightSpec[] }> = ({ highlights }) => {
  const { fps } = useVideoConfig();
  const sec = (s: number) => Math.round(s * fps);

  if (!highlights || highlights.length === 0) return null;

  return (
    <>
      {highlights.map((h, i) => (
        <Sequence key={i} from={sec(h.from)} durationInFrames={sec(h.duration)} layout="none">
          <Pulse xPct={h.xPct} yPct={h.yPct} durationFrames={sec(h.duration)} />
        </Sequence>
      ))}
    </>
  );
};
