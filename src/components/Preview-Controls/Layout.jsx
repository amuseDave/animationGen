import { useDispatch, useSelector } from "react-redux";
import CustomPreviewControls from "./Custom/Layout";
import { uiActions } from "../../store/uiSlicer";
import { Copy } from "lucide-react";
import ShareBtn from "./Static/ShareBtn";
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

        {/* TOP RIGHT OF PREVIEW CONTROLER COPY & SHARE */}

        <div className="top-0 right-0 preview-controller-copy-share">
          <div className="relative preview-controller-box-item">
            <Copy size={24} strokeWidth={1.3} onClick={handleModal} />
          </div>
          <div className="relative preview-controller-box-item">
            <ShareBtn />
          </div>
        </div>

        {/* TOP RIGHT OF PREVIEW CONTROLER COPY & SHARE */}
      </>
    )
  );
}
