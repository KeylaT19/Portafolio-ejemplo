import { Img, OffthreadVideo, staticFile } from "remotion";

// Native capture resolution of the source screen recordings.
const NATIVE_W = 572;
const NATIVE_H = 1280;
// Crop window: hide the OS status bar / browser chrome at the top and the
// Android system nav bar at the bottom, keep the app's own UI in between.
const CROP_TOP = 50;
const CROP_BOTTOM = 70;
const CROP_H = NATIVE_H - CROP_TOP - CROP_BOTTOM;

const BEZEL_SIDE = 16;
const BEZEL_TOP = 46;
const BEZEL_BOTTOM = 22;

export const PhoneMock: React.FC<{
  type: "video" | "image";
  src: string;
  screenWidth?: number;
}> = ({ type, src, screenWidth = 520 }) => {
  const screenHeight = (CROP_H / NATIVE_W) * screenWidth;
  const frameWidth = screenWidth + BEZEL_SIDE * 2;
  const frameHeight = screenHeight + BEZEL_TOP + BEZEL_BOTTOM;

  const contentScale = screenWidth / NATIVE_W;
  const contentHeight = NATIVE_H * contentScale;
  const contentTopOffset = -CROP_TOP * contentScale;

  return (
    <div
      style={{
        width: frameWidth,
        height: frameHeight,
        borderRadius: 62,
        background: "linear-gradient(160deg, #2B2E38 0%, #101216 60%)",
        boxShadow:
          "0 40px 90px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 2px rgba(255,255,255,0.04)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: BEZEL_TOP,
          left: BEZEL_SIDE,
          width: screenWidth,
          height: screenHeight,
          borderRadius: 34,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: contentTopOffset,
            left: 0,
            width: screenWidth,
            height: contentHeight,
          }}
        >
          {type === "video" ? (
            <OffthreadVideo
              src={staticFile(src)}
              style={{ width: screenWidth, height: contentHeight, objectFit: "cover" }}
            />
          ) : (
            <Img
              src={staticFile(src)}
              style={{ width: screenWidth, height: contentHeight, objectFit: "cover" }}
            />
          )}
        </div>
      </div>

      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 22,
          borderRadius: 14,
          background: "#0B0C0F",
        }}
      />
    </div>
  );
};
