import { Composition } from "remotion";
import { PartidaAbiertaFlow } from "./PartidaAbiertaFlow";
import {
  CLIPS_PA,
  CLOSING_DURATION_PA,
  FPS_PA,
  secPA,
  TITLE_DURATION_PA,
  TRANSITION_FRAMES_PA,
} from "./timelinePartidaAbierta";

const totalDurationFrames = () => {
  const scenes = 1 /* title */ + CLIPS_PA.length + 1 /* closing */;
  const sceneFrames =
    secPA(TITLE_DURATION_PA) +
    CLIPS_PA.reduce((acc, clip) => acc + secPA(clip.duration), 0) +
    secPA(CLOSING_DURATION_PA);

  const transitions = scenes - 1;
  return sceneFrames - transitions * TRANSITION_FRAMES_PA;
};

export const MyCompositionPartidaAbierta = () => {
  return (
    <Composition
      id="PartidaAbiertaFlow"
      component={PartidaAbiertaFlow}
      durationInFrames={totalDurationFrames()}
      fps={FPS_PA}
      width={1920}
      height={1080}
    />
  );
};
