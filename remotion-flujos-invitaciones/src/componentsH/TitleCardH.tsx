import { AbsoluteFill } from "remotion";
import { LogoH } from "./LogoH";
import { headingFont } from "../fonts";

export const TitleCardH: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 200px",
      }}
    >
      <LogoH size={150} />
      <div
        style={{
          marginTop: 32,
          fontFamily: `${headingFont}, Arial, sans-serif`,
          fontSize: 60,
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 26,
          fontWeight: 700,
          color: "#F5B84D",
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
