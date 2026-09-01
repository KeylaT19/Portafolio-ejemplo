import { Img, staticFile } from "remotion";

export const LogoH: React.FC<{ size?: number }> = ({ size = 150 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 0 0 3px rgba(255,255,255,0.85), 0 10px 30px rgba(0,0,0,0.35)",
        flexShrink: 0,
      }}
    >
      <Img
        src={staticFile("videos/logo_hq.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.12)" }}
      />
    </div>
  );
};
