import { Img, staticFile } from "remotion";

export const HeaderH: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 56,
        display: "flex",
        alignItems: "center",
        gap: 16,
        zIndex: 5,
      }}
    >
      <Img
        src={staticFile("videos/logo_transparent.png")}
        style={{ width: 46, height: 46, objectFit: "contain", flexShrink: 0 }}
      />
      <div
        style={{
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.2,
        }}
      >
        Centro Asturiano de México, A.C.
      </div>
    </div>
  );
};
