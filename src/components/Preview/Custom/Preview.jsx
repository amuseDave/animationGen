import { useSelector } from "react-redux";
import Loader from "../Static/Loader";

export default function Preview() {
  const isResizing = useSelector((state) => state.ui.isResizing);

  return (
    <>
      <div
        className={`absolute cc w-[80%] h-[40%] bg-slate-700 z-10 ${
          isResizing && "hidden"
        }`}
      >
        Preview
      </div>
      {isResizing && <Loader />}
    </>
  );
}
