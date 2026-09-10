import { AbsoluteFill } from "remotion";
import { LogoH } from "./LogoH";
import { headingFont } from "../fonts";

export const TitleCardH: React.FC<{
  title: string;
  subtitle?: string;
  logoSize?: number;
}> = ({ title, subtitle, logoSize = 260 }) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 200px",
      }}
    >
      <LogoH size={logoSize} />
      <div
        style={{
          marginTop: 40,
          fontFamily: `${headingFont}, Arial, sans-serif`,
          fontSize: 64,
          fontWeight: 800,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
          maxWidth: 1400,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 26,
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 30,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1200,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
