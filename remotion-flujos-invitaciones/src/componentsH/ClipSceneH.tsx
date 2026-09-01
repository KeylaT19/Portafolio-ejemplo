import { AbsoluteFill } from "remotion";
import { ClipSpecH } from "../timelineH";
import { PhoneMock } from "./PhoneMock";
import { TextPanel } from "./TextPanel";
import { HeaderH } from "./HeaderH";

export const ClipSceneH: React.FC<{
  clip: ClipSpecH;
  sectionTag: string;
  stepIndex: number;
  stepCount: number;
}> = ({ clip, sectionTag, stepIndex, stepCount }) => {
  return (
    <AbsoluteFill>
      <HeaderH sectionTag={sectionTag} stepLabel={clip.step} stepIndex={stepIndex} stepCount={stepCount} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 150,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <PhoneMock type={clip.type} src={clip.src} screenWidth={400} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 682,
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
