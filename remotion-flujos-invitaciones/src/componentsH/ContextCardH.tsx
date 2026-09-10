import { AbsoluteFill } from "remotion";
import { LogoH } from "./LogoH";
import { headingFont } from "../fonts";

export const ContextCardH: React.FC<{ lead: string; emphasis: string }> = ({
  lead,
  emphasis,
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
      <LogoH size={130} />
      <div
        style={{
          marginTop: 32,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 32,
          fontWeight: 600,
          color: "rgba(255,255,255,0.82)",
          textAlign: "center",
          lineHeight: 1.45,
          maxWidth: 1250,
        }}
      >
        {lead}
      </div>
      <div
        style={{
          marginTop: 30,
          fontFamily: `${headingFont}, Arial, sans-serif`,
          fontSize: 54,
          fontWeight: 800,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.25,
          maxWidth: 1350,
        }}
      >
        {emphasis}
      </div>
    </AbsoluteFill>
  );
};
