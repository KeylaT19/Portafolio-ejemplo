import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundH } from "./componentsH/BackgroundH";
import { TitleCardH } from "./componentsH/TitleCardH";
import { ClosingCardH } from "./componentsH/ClosingCardH";
import { ClipSceneH } from "./componentsH/ClipSceneH";
import { CLOSING_DURATION_H, secH, SECTIONS_H, TRANSITION_FRAMES } from "./timelineH";

export const InvitacionesFlowH: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
    />
  );

  const items: React.ReactNode[] = [];

  SECTIONS_H.forEach((section, sIdx) => {
    items.push(
      <TransitionSeries.Sequence
        key={`title-${sIdx}`}
        durationInFrames={secH(section.titleDuration)}
      >
        <AbsoluteFill>
          <BackgroundH />
          <TitleCardH title={section.title} subtitle={section.subtitle} />
        </AbsoluteFill>
      </TransitionSeries.Sequence>,
    );
    items.push(transition);

    section.clips.forEach((clip, cIdx) => {
      items.push(
        <TransitionSeries.Sequence key={`clip-${sIdx}-${cIdx}`} durationInFrames={secH(clip.duration)}>
          <AbsoluteFill>
            <BackgroundH />
            <ClipSceneH
              clip={clip}
              sectionTag={section.tag}
              stepIndex={cIdx + 1}
              stepCount={section.clips.length}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>,
      );
      items.push(transition);
    });
  });

  items.push(
    <TransitionSeries.Sequence key="closing" durationInFrames={secH(CLOSING_DURATION_H)}>
      <AbsoluteFill>
        <BackgroundH />
        <ClosingCardH />
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
