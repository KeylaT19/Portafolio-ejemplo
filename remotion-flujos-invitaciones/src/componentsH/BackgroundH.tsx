import { AbsoluteFill } from "remotion";

export const BackgroundH: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(115deg, #0E1440 0%, #161C5A 30%, #1D2570 55%, #141A54 78%, #0B0F35 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(38% 55% at 88% 8%, rgba(245,169,35,0.10) 0%, rgba(245,169,35,0) 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(45% 60% at 8% 100%, rgba(60,80,220,0.22) 0%, rgba(60,80,220,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};
