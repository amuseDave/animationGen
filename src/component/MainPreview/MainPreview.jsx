import { useSelector } from "react-redux";
import Alerts from "../Controller/Alerts";
import CustomCanvas from "./CustomCanvas";
import DefaultCanvas from "./DefaultCanvas";

export default function MainPreview() {
  const { type } = useSelector((state) => state.ui);

  return (
    <section className="h-[700px] relative">
      <h2 className="absolute text-white top-5 left-5">Animation Name</h2>
      {type === "custom" ? <CustomCanvas /> : <DefaultCanvas />}
      <Alerts />
    </section>
  );
}
