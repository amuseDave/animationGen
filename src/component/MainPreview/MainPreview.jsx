import { useSelector } from "react-redux";
import Alerts from "../Controller/Alerts";
import CustomCanvas from "./CustomCanvas";
import DefaultCanvas from "./DefaultCanvas";
import PreviewControls from "./PreviewControls";

export default function MainPreview() {
  const { type } = useSelector((state) => state.ui);

  return (
    <section className="relative h-[720px] overflow-hidden rounded-xl">
      <h2 className="absolute text-white top-5 left-5">Animation Name</h2>
      <PreviewControls />
      {type === "custom" ? <CustomCanvas /> : <DefaultCanvas />}
      <Alerts />
    </section>
  );
}
