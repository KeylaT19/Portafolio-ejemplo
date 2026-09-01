import { Composition } from "remotion";
import { InvitacionesFlowH } from "./InvitacionesFlowH";
import {
  CLIPS_H,
  CLOSING_DURATION_H,
  FPS_H,
  secH,
  TITLE_DURATION_H,
  TRANSITION_FRAMES,
} from "./timelineH";

const totalDurationFrames = () => {
  const scenes = 1 /* title */ + CLIPS_H.length + 1 /* closing */;
  const sceneFrames =
    secH(TITLE_DURATION_H) +
    CLIPS_H.reduce((acc, clip) => acc + secH(clip.duration), 0) +
    secH(CLOSING_DURATION_H);

  const transitions = scenes - 1;
  return sceneFrames - transitions * TRANSITION_FRAMES;
};

export const MyCompositionH = () => {
  return (
    <Composition
      id="InvitacionesFlowH"
      component={InvitacionesFlowH}
      durationInFrames={totalDurationFrames()}
      fps={FPS_H}
      width={1920}
      height={1080}
    />
  );
};
