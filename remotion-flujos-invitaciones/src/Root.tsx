import "./index.css";
import { MyComposition } from "./Composition";
import { MyCompositionH } from "./CompositionH";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MyCompositionH />
    </>
  );
};
