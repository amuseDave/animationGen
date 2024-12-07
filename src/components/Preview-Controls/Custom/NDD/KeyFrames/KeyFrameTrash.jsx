import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import trashSvg from "../../../../../assets/svgs/trashSvg.svg";
import { customActions } from "../../../../../store/customSlicer";

let deleteErrorNotification;

export default function KeyFrameTrash() {
  const dispatch = useDispatch();

  const keyFramesPers = useSelector((state) => state.custom.keyFramePers);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

  function handleDeleteKeyFrame() {
    if (activeKeyFrame === 0 || activeKeyFrame === keyFramesPers.length - 1) {
      ///
      if (deleteErrorNotification) return;
      deleteErrorNotification = true;
      setTimeout(() => {
        deleteErrorNotification = false;
      }, 1000);
      toast.error("Cant delete default keyframe!");
      ///
      return;
    }
    dispatch(customActions.handleKeyFrame({ action: "delete" }));
  }

  return (
    <div
      className="preview-controller-box-item group"
      onClick={handleDeleteKeyFrame}
    >
      <img
        src={trashSvg}
        className="transition-all group-hover:brightness-150"
      />
    </div>
  );
}
