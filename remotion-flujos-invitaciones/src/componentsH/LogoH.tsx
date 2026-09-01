import { Img, staticFile } from "remotion";

export const LogoH: React.FC<{ size?: number }> = ({ size = 150 }) => {
  return (
    <Img
      src={staticFile("videos/logo_transparent.png")}
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }}
    />
  );
};
