import { AbsoluteFill } from "remotion";
import { ClipSpec } from "../captionTypes";
import { PhoneMock } from "./PhoneMock";
import { TextPanel } from "./TextPanel";
import { HeaderH } from "./HeaderH";
import { ScreenTag } from "./ScreenTag";

export const ClipSceneH: React.FC<{ clip: ClipSpec }> = ({ clip }) => {
  return (
    <AbsoluteFill>
      <HeaderH roleTag={clip.roleTag} roleTagVariant={clip.roleTagVariant} />
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
        <PhoneMock
          type={clip.type}
          src={clip.src}
          screenWidth={360}
          cropTop={clip.phoneCropTop}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 622,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <ScreenTag label={clip.tag} />
        <TextPanel captions={clip.captions} />
      </div>
    </AbsoluteFill>
  );
};
