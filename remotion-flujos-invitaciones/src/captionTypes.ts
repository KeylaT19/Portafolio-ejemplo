export type CaptionSpec = {
  text: string;
  from: number; // seconds, relative to clip start
  duration: number; // seconds
};

export type ClipSpec = {
  type: "video" | "image";
  src: string;
  duration: number; // seconds
  tag: string; // pill above the description text
  captions: CaptionSpec[];
};
