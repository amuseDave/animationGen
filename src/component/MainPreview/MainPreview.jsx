import { useSelector } from "react-redux";
import Alerts from "./Alerts";
import CustomCanvas from "./CustomCanvas";
import DefaultCanvas from "./DefaultCanvas";
import PreviewControls from "./PreviewControls";
import Loader from "./Loader";

export default function MainPreview() {
  const { type, isResizing } = useSelector((state) => state.ui);

  return (
    <section className="relative h-[720px] overflow-hidden rounded-xl">
      <h2 className="absolute text-white top-5 left-5">Animation Name</h2>

      {isResizing ? (
        <Loader />
      ) : (
        <>
          <PreviewControls />
          {type === "custom" && <CustomCanvas />}
          {type === "feature" && <h2>Featured animations</h2>}
          {type === "micro" && <h2>Micro animations</h2>}
        </>
      )}

      <DefaultCanvas />
      <Alerts />
    </section>
  );
}
