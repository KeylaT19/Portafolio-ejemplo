import { Composition } from "remotion";
import { InvitacionesFlow } from "./InvitacionesFlow";
import { FPS, sec, totalDurationSeconds } from "./timeline";

export const MyComposition = () => {
  return (
    <Composition
      id="InvitacionesFlow"
      component={InvitacionesFlow}
      durationInFrames={sec(totalDurationSeconds)}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
