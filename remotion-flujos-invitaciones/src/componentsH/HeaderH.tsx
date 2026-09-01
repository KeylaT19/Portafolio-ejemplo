import { Img, staticFile } from "remotion";

export const HeaderH: React.FC<{
  sectionTag: string;
  stepLabel: string;
  stepIndex: number;
  stepCount: number;
}> = ({ sectionTag, stepLabel, stepIndex, stepCount }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 56,
        right: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        zIndex: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 0 2px rgba(255,255,255,0.5)",
          }}
        >
          <Img
            src={staticFile("videos/logo_hq.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.12)" }}
          />
        </div>
        <div>
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
          <div
            style={{
              fontFamily: "Inter, Arial, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              color: "#F5B84D",
              marginTop: 2,
            }}
          >
            {sectionTag}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 1,
            color: "#F5B84D",
          }}
        >
          PASO {stepIndex} DE {stepCount} · {stepLabel}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
          {Array.from({ length: stepCount }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 30,
                height: 5,
                borderRadius: 3,
                background: i < stepIndex ? "#F5B84D" : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
