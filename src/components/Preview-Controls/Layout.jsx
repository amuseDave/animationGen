import { useDispatch, useSelector } from "react-redux";
import CustomPreviewControls from "./Custom/Layout";
import { uiActions } from "../../store/uiSlicer";
import { Copy } from "lucide-react";
export default function Layout() {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.ui.type);
  function handleModal() {
    dispatch(uiActions.handleModal(true));
  }
  return (
    type && (
      <>
        {type === "custom" && <CustomPreviewControls />}
        {type === "featured" && <h2>Featured animations</h2>}
        {type === "micro" && <h2>Micro animations</h2>}

        <div className="preview-controller-copy">
          <Copy size={32} onClick={handleModal} />
        </div>
      </>
    )
  );
}
