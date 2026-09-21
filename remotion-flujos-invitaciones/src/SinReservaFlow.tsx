import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundH } from "./componentsH/BackgroundH";
import { TitleCardH } from "./componentsH/TitleCardH";
import { ClosingCardH } from "./componentsH/ClosingCardH";
import { ContextCardH } from "./componentsH/ContextCardH";
import { ClipSceneH } from "./componentsH/ClipSceneH";
import {
  CLIPS_SR,
  CLOSING_DURATION_SR,
  CLOSING_TITLE_SR,
  CONTEXT_BOX_TEXT_SR,
  CONTEXT_DURATION_SR,
  CONTEXT_TITLE_SR,
  MAIN_TITLE_SR,
  secSR,
  TITLE_DURATION_SR,
  TRANSITION_FRAMES_SR,
} from "./timelineSinReserva";

export const SinReservaFlow: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_SR })}
    />
  );

  const items: React.ReactNode[] = [];

  items.push(
    <TransitionSeries.Sequence key="title" durationInFrames={secSR(TITLE_DURATION_SR)}>
      <AbsoluteFill>
        <BackgroundH />
        <TitleCardH title={MAIN_TITLE_SR} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  items.push(
    <TransitionSeries.Sequence key="context" durationInFrames={secSR(CONTEXT_DURATION_SR)}>
      <AbsoluteFill>
        <BackgroundH />
        <ContextCardH title={CONTEXT_TITLE_SR} boxText={CONTEXT_BOX_TEXT_SR} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  CLIPS_SR.forEach((clip, i) => {
    items.push(
      <TransitionSeries.Sequence key={`clip-${i}`} durationInFrames={secSR(clip.duration)}>
        <AbsoluteFill>
          <BackgroundH />
          <ClipSceneH clip={clip} />
        </AbsoluteFill>
      </TransitionSeries.Sequence>,
    );
    items.push(transition);
  });

  // The loop above already left a trailing `transition` after the last
  // clip, which doubles as the separator before the closing card.
  items.push(
    <TransitionSeries.Sequence key="closing" durationInFrames={secSR(CLOSING_DURATION_SR)}>
      <AbsoluteFill>
        <BackgroundH />
        <ClosingCardH title={CLOSING_TITLE_SR} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );

  return (
    <AbsoluteFill style={{ background: "#0B0F35" }}>
      <Audio src={staticFile("videos/sinreserva_audio.m4a")} />
      <TransitionSeries>{items}</TransitionSeries>
    </AbsoluteFill>
  );
};
