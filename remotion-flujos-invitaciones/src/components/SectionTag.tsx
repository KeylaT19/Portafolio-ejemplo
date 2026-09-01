import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const SectionTag: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, fps * 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        zIndex: 5,
      }}
    >
      <div
        style={{
          padding: "16px 40px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(6px)",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#FFFFFF",
        }}
      >
        {label}
      </div>
    </div>
  );
};
