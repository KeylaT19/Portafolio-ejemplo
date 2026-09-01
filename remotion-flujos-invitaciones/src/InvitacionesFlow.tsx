import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/Background";
import { TitleCard } from "./components/TitleCard";
import { ClosingCard } from "./components/ClosingCard";
import { SectionTag } from "./components/SectionTag";
import { ClipScene } from "./components/ClipScene";
import { CLOSING_DURATION, sec, sectionContentDuration, SECTIONS } from "./timeline";

export const InvitacionesFlow: React.FC = () => {
  let cursor = 0;
  const blocks: React.ReactNode[] = [];

  for (const section of SECTIONS) {
    blocks.push(
      <Sequence key={`title-${section.tag}`} from={sec(cursor)} durationInFrames={sec(section.titleDuration)} layout="none">
        <TitleCard eyebrow={section.tag} title={section.title} subtitle={section.subtitle} />
      </Sequence>,
    );
    cursor += section.titleDuration;

    const contentDuration = sectionContentDuration(section);
    blocks.push(
      <Sequence key={`tag-${section.tag}`} from={sec(cursor)} durationInFrames={sec(contentDuration)} layout="none">
        <SectionTag label={section.tag} />
      </Sequence>,
    );

    for (const [i, clip] of section.clips.entries()) {
      blocks.push(
        <Sequence
          key={`clip-${section.tag}-${i}`}
          from={sec(cursor)}
          durationInFrames={sec(clip.duration)}
          layout="none"
        >
          <ClipScene clip={clip} />
        </Sequence>,
      );
      cursor += clip.duration;
    }
  }

  blocks.push(
    <Sequence key="closing" from={sec(cursor)} durationInFrames={sec(CLOSING_DURATION)} layout="none">
      <ClosingCard />
    </Sequence>,
  );

  return (
    <AbsoluteFill>
      <Background />
      {blocks}
    </AbsoluteFill>
  );
};
