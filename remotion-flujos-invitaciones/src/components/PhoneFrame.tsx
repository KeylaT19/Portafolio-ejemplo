import {
  Img,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Native capture resolution of the source screen recordings.
const NATIVE_W = 572;
const NATIVE_H = 1280;
// Crop window: hide the OS status bar / browser chrome at the top and the
// Android system nav bar at the bottom, keep the app's own UI in between.
const CROP_TOP = 50;
const CROP_BOTTOM = 70;
const CROP_H = NATIVE_H - CROP_TOP - CROP_BOTTOM;

export const PhoneFrame: React.FC<{
  type: "video" | "image";
  src: string;
  width?: number;
  trimBefore?: number;
}> = ({ type, src, width = 760, trimBefore }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = width / NATIVE_W;
  const height = CROP_H * scale;
  const nativeHeightScaled = NATIVE_H * scale;
  const topOffset = -CROP_TOP * scale;

  const entrance = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(entrance, [0, 1], [0.94, 1]);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 34,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 30px 70px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
        opacity: entrance,
        transform: `scale(${cardScale})`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div style={{ position: "absolute", top: topOffset, left: 0, width, height: nativeHeightScaled }}>
        {type === "video" ? (
          <OffthreadVideo
            src={staticFile(src)}
            trimBefore={trimBefore}
            style={{ width, height: nativeHeightScaled, objectFit: "cover" }}
          />
        ) : (
          <Img
            src={staticFile(src)}
            style={{ width, height: nativeHeightScaled, objectFit: "cover" }}
          />
        )}
      </div>
    </div>
  );
};
