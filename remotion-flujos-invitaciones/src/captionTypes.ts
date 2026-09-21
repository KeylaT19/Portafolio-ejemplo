export type CaptionSpec = {
  text: string;
  from: number; // seconds, relative to clip start
  duration: number; // seconds
};

export type HighlightSpec = {
  type?: "pulse" | "arrow"; // "pulse" (default): tap flash. "arrow": points at a static element.
  xPct: number; // 0-100, horizontal position within the visible (cropped) screen
  yPct: number; // 0-100, vertical position within the visible (cropped) screen
  from: number; // seconds, relative to clip start
  duration: number; // seconds
  angleDeg?: number; // arrow only: direction the arrow's tail extends from the tip
  length?: number; // arrow only: shaft length in px (at native 360-wide phone scale)
};

export type ClipSpec = {
  type: "video" | "image";
  src: string;
  duration: number; // seconds
  tag: string; // pill above the description text
  roleTag?: string; // optional pill top-right, aligned with the brand row
  roleTagVariant?: "amber" | "sky"; // color scheme for the roleTag pill
  phoneCropTop?: number; // override PhoneMock's default top crop for this clip
  highlights?: HighlightSpec[]; // tap/point-at pulses drawn over the phone screen
  captions: CaptionSpec[];
};
