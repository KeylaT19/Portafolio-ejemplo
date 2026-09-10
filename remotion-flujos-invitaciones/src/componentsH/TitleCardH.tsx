import { AbsoluteFill } from "remotion";
import { LogoH } from "./LogoH";
import { headingFont } from "../fonts";

export const TitleCardH: React.FC<{ title: string }> = ({ title }) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 200px",
      }}
    >
      <LogoH size={260} />
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
    </AbsoluteFill>
  );
};
