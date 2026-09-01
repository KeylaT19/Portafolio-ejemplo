import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo } from "./Logo";

export const ClosingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeScale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 110px",
        opacity,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #34C759 0%, #1FA34A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${badgeScale})`,
          boxShadow: "0 10px 30px rgba(52,199,89,0.35)",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          marginTop: 40,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 56,
          fontWeight: 800,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Así de fácil gestionas tus invitaciones
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
        Acepta, confirma y sal de tus grupos y partidas en unos toques.
      </div>

      <div style={{ marginTop: 46 }}>
        <Logo size={84} />
      </div>
    </AbsoluteFill>
  );
};
