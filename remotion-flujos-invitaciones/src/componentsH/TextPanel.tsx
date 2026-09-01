import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionSpec, secH } from "../timelineH";
import { headingFont } from "../fonts";

const Line: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [0, fps * 0.3], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fps * 0.25, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        opacity,
        transform: `translateY(${rise}px)`,
        fontFamily: `${headingFont}, Arial, sans-serif`,
        fontSize: 56,
        fontWeight: 800,
        color: "#FFFFFF",
        lineHeight: 1.25,
        textAlign: "left",
        maxWidth: 1180,
      }}
    >
      {text}
    </div>
  );
};

export const TextPanel: React.FC<{ captions: CaptionSpec[] }> = ({ captions }) => {
  return (
    <div style={{ position: "relative", width: 1180, height: 380, display: "flex", alignItems: "center" }}>
      {captions.map((c, i) => (
        <Sequence key={i} from={secH(c.from)} durationInFrames={secH(c.duration)} layout="none">
          <Line text={c.text} />
        </Sequence>
      ))}
    </div>
  );
};
