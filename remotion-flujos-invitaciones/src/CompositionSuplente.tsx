import { Composition } from "remotion";
import { SuplenteFlow } from "./SuplenteFlow";
import {
  CLIPS_S,
  CLOSING_DURATION_S,
  FPS_S,
  secS,
  TITLE_DURATION_S,
  TRANSITION_FRAMES_S,
} from "./timelineSuplente";

const totalDurationFrames = () => {
  const scenes = 1 /* title */ + CLIPS_S.length + 1 /* closing */;
  const sceneFrames =
    secS(TITLE_DURATION_S) +
    CLIPS_S.reduce((acc, clip) => acc + secS(clip.duration), 0) +
    secS(CLOSING_DURATION_S);

  const transitions = scenes - 1;
  return sceneFrames - transitions * TRANSITION_FRAMES_S;
};

export const MyCompositionSuplente = () => {
  return (
    <Composition
      id="SuplenteFlow"
      component={SuplenteFlow}
      durationInFrames={totalDurationFrames()}
      fps={FPS_S}
      width={1920}
      height={1080}
    />
  );
};
