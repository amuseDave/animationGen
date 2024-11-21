import Preview from "./Preview";
import PreviewDD from "./PreviewDD";
import { useSelector, shallowEqual } from "react-redux";
export default function PreviewWrapper() {
  const { isDragDrop } = useSelector((state) => {
    return { isDragDrop: state.ui.isDragDrop };
  }, shallowEqual);

  return isDragDrop ? <PreviewDD /> : <Preview />;
}
