import { Composition } from "remotion";
import { ReenviarInvitacionFlow } from "./ReenviarInvitacionFlow";
import {
  CLIPS_RE,
  CLOSING_DURATION_RE,
  FPS_RE,
  secRE,
  TITLE_DURATION_RE,
  TRANSITION_FRAMES_RE,
} from "./timelineReenviar";

const totalDurationFrames = () => {
  const scenes = 1 /* title */ + CLIPS_RE.length + 1 /* closing */;
  const sceneFrames =
    secRE(TITLE_DURATION_RE) +
    CLIPS_RE.reduce((acc, clip) => acc + secRE(clip.duration), 0) +
    secRE(CLOSING_DURATION_RE);

  const transitions = scenes - 1;
  return sceneFrames - transitions * TRANSITION_FRAMES_RE;
};

export const MyCompositionReenviar = () => {
  return (
    <Composition
      id="ReenviarInvitacionFlow"
      component={ReenviarInvitacionFlow}
      durationInFrames={totalDurationFrames()}
      fps={FPS_RE}
      width={1920}
      height={1080}
    />
  );
};
