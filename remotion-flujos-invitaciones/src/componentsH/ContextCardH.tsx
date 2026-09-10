import { AbsoluteFill } from "remotion";
import { LogoH } from "./LogoH";
import { headingFont } from "../fonts";

export const ContextCardH: React.FC<{ title: string; boxText: string }> = ({
  title,
  boxText,
}) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 220px",
      }}
    >
      <LogoH size={150} />
      <div
        style={{
          marginTop: 36,
          fontFamily: `${headingFont}, Arial, sans-serif`,
          fontSize: 62,
          fontWeight: 800,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          maxWidth: 1350,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 34,
          padding: "28px 44px",
          borderRadius: 24,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        <div
          style={{
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 34,
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1200,
          }}
        >
          {boxText}
        </div>
      </div>
    </AbsoluteFill>
  );
};
