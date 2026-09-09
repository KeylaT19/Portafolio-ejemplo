import "./index.css";
import { MyComposition } from "./Composition";
import { MyCompositionH } from "./CompositionH";
import { MyCompositionSuplente } from "./CompositionSuplente";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MyCompositionH />
      <MyCompositionSuplente />
    </>
  );
};
