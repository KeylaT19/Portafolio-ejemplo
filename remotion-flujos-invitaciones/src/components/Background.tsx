import { AbsoluteFill } from "remotion";

export const Background: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #2B3080 0%, #191C55 42%, #0C0E30 78%, #08091F 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(45% 30% at 12% 90%, rgba(93,79,220,0.28) 0%, rgba(93,79,220,0) 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(40% 25% at 90% 12%, rgba(245,169,35,0.16) 0%, rgba(245,169,35,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};
