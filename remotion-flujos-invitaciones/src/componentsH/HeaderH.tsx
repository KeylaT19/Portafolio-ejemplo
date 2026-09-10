import { Img, staticFile } from "remotion";

const ROLE_TAG_VARIANTS = {
  amber: {
    background: "linear-gradient(135deg, #FFC55C 0%, #E8940F 100%)",
    boxShadow: "0 8px 20px rgba(232,148,15,0.35)",
    color: "#2A1B00",
  },
  sky: {
    background: "linear-gradient(135deg, #7DD3FC 0%, #0EA5E9 100%)",
    boxShadow: "0 8px 20px rgba(14,165,233,0.35)",
    color: "#062B3D",
  },
};

export const HeaderH: React.FC<{
  roleTag?: string;
  roleTagVariant?: "amber" | "sky";
}> = ({ roleTag, roleTagVariant = "amber" }) => {
  const variant = ROLE_TAG_VARIANTS[roleTagVariant];
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
            background: variant.background,
            boxShadow: variant.boxShadow,
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: variant.color,
            whiteSpace: "nowrap",
          }}
        >
          {roleTag}
        </div>
      ) : null}
    </div>
  );
};
