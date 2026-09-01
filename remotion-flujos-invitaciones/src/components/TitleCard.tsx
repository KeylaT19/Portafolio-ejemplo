import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "./Logo";

export const TitleCard: React.FC<{
  eyebrow: string;
  title: string;
  subtitle: string;
}> = ({ eyebrow, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [0, fps * 0.6], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 0.45, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 110px",
        opacity,
        transform: `translateY(${rise}px)`,
      }}
    >
      <Logo size={140} />
      <div
        style={{
          marginTop: 34,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#F5C168",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 62,
          fontWeight: 800,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 22,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 30,
          fontWeight: 400,
          color: "rgba(255,255,255,0.68)",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 760,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
