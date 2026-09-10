import { Img, staticFile } from "remotion";

export const HeaderH: React.FC<{ roleTag?: string }> = ({ roleTag }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 56,
        right: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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

      {roleTag ? (
        <div
          style={{
            padding: "13px 32px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #FFC55C 0%, #E8940F 100%)",
            boxShadow: "0 8px 20px rgba(232,148,15,0.35)",
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: "#2A1B00",
            whiteSpace: "nowrap",
          }}
        >
          {roleTag}
        </div>
      ) : null}
    </div>
  );
};
