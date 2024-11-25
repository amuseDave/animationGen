import KeyFrames from "./KeyFrames";
import { useSelector } from "react-redux";

export default function KeyFramesWrapper() {
  const keyFrames = useSelector((state) => state.custom.keyFrames);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);
  return <KeyFrames />;
}
