import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundH } from "./componentsH/BackgroundH";
import { TitleCardH } from "./componentsH/TitleCardH";
import { ClosingCardH } from "./componentsH/ClosingCardH";
import { ClipSceneH } from "./componentsH/ClipSceneH";
import {
  CLIPS_PA,
  CLOSING_DURATION_PA,
  CLOSING_TITLE_PA,
  MAIN_TITLE_PA,
  secPA,
  TITLE_DURATION_PA,
  TRANSITION_FRAMES_PA,
} from "./timelinePartidaAbierta";

export const PartidaAbiertaFlow: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_PA })}
    />
  );

  const items: React.ReactNode[] = [];

  items.push(
    <TransitionSeries.Sequence key="title" durationInFrames={secPA(TITLE_DURATION_PA)}>
      <AbsoluteFill>
        <BackgroundH />
        <TitleCardH title={MAIN_TITLE_PA} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  CLIPS_PA.forEach((clip, i) => {
    items.push(
      <TransitionSeries.Sequence key={`clip-${i}`} durationInFrames={secPA(clip.duration)}>
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
    <TransitionSeries.Sequence key="closing" durationInFrames={secPA(CLOSING_DURATION_PA)}>
      <AbsoluteFill>
        <BackgroundH />
        <ClosingCardH title={CLOSING_TITLE_PA} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );

  return (
    <AbsoluteFill style={{ background: "#0B0F35" }}>
      <TransitionSeries>{items}</TransitionSeries>
    </AbsoluteFill>
  );
};
