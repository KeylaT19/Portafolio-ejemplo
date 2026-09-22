import { AbsoluteFill } from "remotion";
import { ClipSpec } from "../captionTypes";
import { PhoneMock } from "./PhoneMock";
import { TextPanel } from "./TextPanel";
import { HeaderH } from "./HeaderH";
import { ScreenTag } from "./ScreenTag";

export const ClipSceneH: React.FC<{
  clip: ClipSpec;
  // Overrides for flows that want a bigger phone mock than the shared
  // default (e.g. SinReservaFlow). Leaving these unset keeps every other
  // flow pixel-identical to before.
  phoneScreenWidth?: number;
  phoneLeft?: number;
  phoneTop?: number;
}> = ({ clip, phoneScreenWidth = 360, phoneLeft = 130, phoneTop }) => {
  return (
    <AbsoluteFill>
      <HeaderH roleTag={clip.roleTag} roleTagVariant={clip.roleTagVariant} />
      <div
        style={
          phoneTop !== undefined
            ? { position: "absolute", top: phoneTop, left: phoneLeft, display: "flex" }
            : {
                position: "absolute",
                top: 0,
                left: phoneLeft,
                bottom: 0,
                display: "flex",
                alignItems: "center",
              }
        }
      >
        <PhoneMock
          type={clip.type}
          src={clip.src}
          screenWidth={phoneScreenWidth}
          cropTop={clip.phoneCropTop}
          highlights={clip.highlights}
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
        {clip.tag ? <ScreenTag label={clip.tag} /> : null}
        {clip.captions.length > 0 ? <TextPanel captions={clip.captions} /> : null}
      </div>
    </AbsoluteFill>
  );
};
