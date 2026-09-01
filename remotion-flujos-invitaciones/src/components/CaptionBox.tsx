import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const CaptionBox: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps * 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [0, fps * 0.35], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 0.3, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        maxWidth: 880,
        padding: "26px 40px",
        borderRadius: 26,
        background: "linear-gradient(135deg, #FFC55C 0%, #F5A623 60%, #E8940F 100%)",
        boxShadow: "0 18px 40px rgba(232,148,15,0.32)",
        opacity,
        transform: `translateY(${rise}px)`,
      }}
    >
      <div
        style={{
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#2A1B00",
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {text}
      </div>
    </div>
  );
};
