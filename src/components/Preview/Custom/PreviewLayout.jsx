import Preview from "./Preview";
import PreviewDD from "./PreviewDD";
import { useSelector } from "react-redux";
export default function PreviewWrapper() {
  const isDragDrop = useSelector((state) => state.ui.isDragDrop);

  return isDragDrop ? <PreviewDD /> : <Preview />;
}
