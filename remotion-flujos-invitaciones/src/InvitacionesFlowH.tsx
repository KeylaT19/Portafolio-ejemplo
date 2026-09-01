import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundH } from "./componentsH/BackgroundH";
import { TitleCardH } from "./componentsH/TitleCardH";
import { ClosingCardH } from "./componentsH/ClosingCardH";
import { ClipSceneH } from "./componentsH/ClipSceneH";
import {
  CLIPS_H,
  CLOSING_DURATION_H,
  CLOSING_TITLE,
  MAIN_TITLE,
  secH,
  TITLE_DURATION_H,
  TRANSITION_FRAMES,
} from "./timelineH";

export const InvitacionesFlowH: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
    />
  );

  const items: React.ReactNode[] = [];

  items.push(
    <TransitionSeries.Sequence key="title" durationInFrames={secH(TITLE_DURATION_H)}>
      <AbsoluteFill>
        <BackgroundH />
        <TitleCardH title={MAIN_TITLE} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );
  items.push(transition);

  CLIPS_H.forEach((clip, i) => {
    items.push(
      <TransitionSeries.Sequence key={`clip-${i}`} durationInFrames={secH(clip.duration)}>
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
    <TransitionSeries.Sequence key="closing" durationInFrames={secH(CLOSING_DURATION_H)}>
      <AbsoluteFill>
        <BackgroundH />
        <ClosingCardH title={CLOSING_TITLE} />
      </AbsoluteFill>
    </TransitionSeries.Sequence>,
  );

  return (
    <AbsoluteFill style={{ background: "#0B0F35" }}>
      <Audio src={staticFile("videos/bg_music.m4a")} />
      <TransitionSeries>{items}</TransitionSeries>
    </AbsoluteFill>
  );
};
