import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { Trash2 } from "lucide-react";
import KeyFrame from "./KeyFrame";
import KeyFramePlus from "./KeyFramePlus";
import { customActions } from "../../../../../store/customSlicer";
import { toast } from "react-toastify";

let deleteErrorNotification;

export default function KeyFrames() {
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
    <div className="mt-10 select-none">
      <section className="grid grid-cols-2 ml-4 gap-y-2 gap-x-2 auto-rows-auto">
        {keyFramesPers.map((frame, index) => {
          return (
            <Fragment key={index}>
              <KeyFrame
                currentIndex={index}
                key={index}
                active={index === activeKeyFrame}
                percentage={frame}
              />
            </Fragment>
          );
        })}
      </section>
      <div className="flex items-center justify-between">
        <KeyFramePlus />
        <Trash2
          onClick={handleDeleteKeyFrame}
          size={32}
          className="text-alert-t-error"
        />
      </div>
    </div>
  );
}
