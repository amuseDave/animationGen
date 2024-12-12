import { useSelector } from "react-redux";
import CustomPreview from "./Custom/PreviewLayout.jsx";
import FeaturedPreview from "./Featured/Layout.jsx";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);
  return (
    type && (
      <>
        {type === "custom" && <CustomPreview />}
        {type === "featured" && <FeaturedPreview />}
        {type === "micro" && <h2>Micro animations</h2>}
      </>
    )
  );
}
