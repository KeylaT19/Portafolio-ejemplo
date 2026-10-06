import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundH } from "./componentsH/BackgroundH";
import { TitleCardH } from "./componentsH/TitleCardH";
import { ClosingCardH } from "./componentsH/ClosingCardH";
import { ClipSceneH } from "./componentsH/ClipSceneH";
import {
  CLIPS_RE,
  CLOSING_DURATION_RE,
  CLOSING_TITLE_RE,
  MAIN_TITLE_RE,
  secRE,
  TITLE_DURATION_RE,
  TRANSITION_FRAMES_RE,
} from "./timelineReenviar";

export const ReenviarInvitacionFlow: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_RE })}
    />
  );

  const items: React.ReactNode[] = [];

  items.push(
    <TransitionSeries.Sequence key="title" durationInFrames={secRE(TITLE_DURATION_RE)}>
      <AbsoluteFill>
        <BackgroundH />
        <TitleCardH title={MAIN_TITLE_RE} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  CLIPS_RE.forEach((clip, i) => {
    items.push(
      <TransitionSeries.Sequence key={`clip-${i}`} durationInFrames={secRE(clip.duration)}>
        <AbsoluteFill>
          <BackgroundH />
          <ClipSceneH clip={clip} phoneScreenWidth={467} phoneLeft={90} phoneTop={115} />
        </AbsoluteFill>
      </TransitionSeries.Sequence>,
    );
    items.push(transition);
  });

  // The loop above already left a trailing `transition` after the last
  // clip, which doubles as the separator before the closing card.
  items.push(
    <TransitionSeries.Sequence key="closing" durationInFrames={secRE(CLOSING_DURATION_RE)}>
      <AbsoluteFill>
        <BackgroundH />
        <ClosingCardH title={CLOSING_TITLE_RE} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );

  return (
    <AbsoluteFill style={{ background: "#0B0F35" }}>
      <Audio src={staticFile("videos/reenviar_audio.m4a")} />
      <TransitionSeries>{items}</TransitionSeries>
    </AbsoluteFill>
  );
};
