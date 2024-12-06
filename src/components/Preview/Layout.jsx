import { useSelector } from "react-redux";
import CustomPreview from "./Custom/PreviewLayout.jsx";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);
  return (
    type && (
      <>
        {type === "custom" && <CustomPreview />}
        {type === "featured" && <h2>Featured animations</h2>}
        {type === "micro" && <h2>Micro animations</h2>}
      </>
    )
  );
}
