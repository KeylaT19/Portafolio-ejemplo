import { Img, staticFile } from "remotion";

export const HeaderH: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 56,
        right: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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

      <div
        style={{
          padding: "12px 30px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "#F5B84D",
        }}
      >
        {tag}
      </div>
    </div>
  );
};
