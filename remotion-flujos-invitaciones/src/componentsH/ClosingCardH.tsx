import { AbsoluteFill } from "remotion";
import { LogoH } from "./LogoH";
import { headingFont } from "../fonts";

export const ClosingCardH: React.FC = () => {
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
          fontSize: 56,
          fontWeight: 700,
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Así de fácil gestionas tus invitaciones
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
        Acepta, confirma y sal de tus grupos y partidas en unos toques.
      </div>
    </AbsoluteFill>
  );
};
