import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
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
    <Trash2
      onClick={handleDeleteKeyFrame}
      size={24}
      className="text-alert-t-error"
    />
  );
}
