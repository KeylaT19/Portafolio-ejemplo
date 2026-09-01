import { Composition } from "remotion";
import { InvitacionesFlowH } from "./InvitacionesFlowH";
import {
  CLOSING_DURATION_H,
  FPS_H,
  secH,
  SECTIONS_H,
  TRANSITION_FRAMES,
} from "./timelineH";

const totalDurationFrames = () => {
  let scenes = 0;
  let sceneFrames = 0;

  for (const section of SECTIONS_H) {
    scenes += 1;
    sceneFrames += secH(section.titleDuration);
    for (const clip of section.clips) {
      scenes += 1;
      sceneFrames += secH(clip.duration);
    }
  }
  scenes += 1;
  sceneFrames += secH(CLOSING_DURATION_H);

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
