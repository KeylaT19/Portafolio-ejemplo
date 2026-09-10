import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundH } from "./componentsH/BackgroundH";
import { TitleCardH } from "./componentsH/TitleCardH";
import { ClosingCardH } from "./componentsH/ClosingCardH";
import { ClipSceneH } from "./componentsH/ClipSceneH";
import {
  CLIPS_S,
  CLOSING_DURATION_S,
  CLOSING_TITLE_S,
  CONTEXT_DURATION_S,
  CONTEXT_SUBTITLE_S,
  CONTEXT_TITLE_S,
  MAIN_TITLE_S,
  secS,
  TITLE_DURATION_S,
  TRANSITION_FRAMES_S,
} from "./timelineSuplente";

export const SuplenteFlow: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES_S })}
    />
  );

  const items: React.ReactNode[] = [];

  items.push(
    <TransitionSeries.Sequence key="title" durationInFrames={secS(TITLE_DURATION_S)}>
      <AbsoluteFill>
        <BackgroundH />
        <TitleCardH title={MAIN_TITLE_S} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  items.push(
    <TransitionSeries.Sequence key="context" durationInFrames={secS(CONTEXT_DURATION_S)}>
      <AbsoluteFill>
        <BackgroundH />
        <TitleCardH title={CONTEXT_TITLE_S} subtitle={CONTEXT_SUBTITLE_S} logoSize={150} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  CLIPS_S.forEach((clip, i) => {
    items.push(
      <TransitionSeries.Sequence key={`clip-${i}`} durationInFrames={secS(clip.duration)}>
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
    <TransitionSeries.Sequence key="closing" durationInFrames={secS(CLOSING_DURATION_S)}>
      <AbsoluteFill>
        <BackgroundH />
        <ClosingCardH title={CLOSING_TITLE_S} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );

  return (
    <AbsoluteFill style={{ background: "#0B0F35" }}>
      <Audio src={staticFile("videos/bg_music_suplente.m4a")} />
      <TransitionSeries>{items}</TransitionSeries>
    </AbsoluteFill>
  );
};
