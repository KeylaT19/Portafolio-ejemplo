import { Composition } from "remotion";
import { SinReservaFlow } from "./SinReservaFlow";
import {
  CLIPS_SR,
  CLOSING_DURATION_SR,
  CONTEXT_DURATION_SR,
  FPS_SR,
  secSR,
  TITLE_DURATION_SR,
  TRANSITION_FRAMES_SR,
} from "./timelineSinReserva";

const totalDurationFrames = () => {
  const scenes = 1 /* title */ + 1 /* context */ + CLIPS_SR.length + 1 /* closing */;
  const sceneFrames =
    secSR(TITLE_DURATION_SR) +
    secSR(CONTEXT_DURATION_SR) +
    CLIPS_SR.reduce((acc, clip) => acc + secSR(clip.duration), 0) +
    secSR(CLOSING_DURATION_SR);

  const transitions = scenes - 1;
  return sceneFrames - transitions * TRANSITION_FRAMES_SR;
};

export const MyCompositionSinReserva = () => {
  return (
    <Composition
      id="SinReservaFlow"
      component={SinReservaFlow}
      durationInFrames={totalDurationFrames()}
      fps={FPS_SR}
      width={1920}
      height={1080}
    />
  );
};
