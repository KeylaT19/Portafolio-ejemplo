import { AbsoluteFill } from "remotion";
import { ClipSpecH } from "../timelineH";
import { PhoneMock } from "./PhoneMock";
import { TextPanel } from "./TextPanel";
import { HeaderH } from "./HeaderH";

export const ClipSceneH: React.FC<{ clip: ClipSpecH }> = ({ clip }) => {
  return (
    <AbsoluteFill>
      <HeaderH tag={clip.tag} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 130,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <PhoneMock type={clip.type} src={clip.src} screenWidth={360} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 622,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextPanel captions={clip.captions} />
      </div>
    </AbsoluteFill>
  );
};
