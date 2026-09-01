import { AbsoluteFill, Sequence } from "remotion";
import { ClipSpec, sec } from "../timeline";
import { PhoneFrame } from "./PhoneFrame";
import { CaptionBox } from "./CaptionBox";

export const ClipScene: React.FC<{ clip: ClipSpec }> = ({ clip }) => {
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <div style={{ marginTop: 236 }}>
        <PhoneFrame type={clip.type} src={clip.src} width={720} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 96,
          display: "flex",
          justifyContent: "center",
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        {clip.captions.map((c, i) => (
          <Sequence key={i} from={sec(c.from)} durationInFrames={sec(c.duration)} layout="none">
            <div style={{ position: "absolute", display: "flex", justifyContent: "center", width: "100%" }}>
              <CaptionBox text={c.text} />
            </div>
          </Sequence>
        ))}
      </div>
    </AbsoluteFill>
  );
};
