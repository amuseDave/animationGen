import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Trash2 } from "lucide-react";
import KeyFrame from "./KeyFrame";
import KeyFramePlus from "./KeyFramePlus";
import { customActions } from "../../../../../store/customSlicer";
import { toast } from "react-toastify";

let deleteErrorNotification;

export default function KeyFrames() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
  useEffect(() => {
    // Measure the container width
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Update width on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-[#080A0A] h-[58%] mt-[1px] z-[9999]">
      <div ref={containerRef} className="w-[98%] mx-auto h-full relative">
        {keyFramesPers.map((_, index) => {
          return (
            <Fragment key={index}>
              <KeyFrame
                containerWidth={containerWidth}
                currentIndex={index}
                key={index}
                active={index === activeKeyFrame}
              />
            </Fragment>
          );
        })}

        <div className="flex items-center">
          <KeyFramePlus />
          <Trash2
            onClick={handleDeleteKeyFrame}
            size={32}
            className="text-alert-t-error"
          />
        </div>
      </div>
    </div>
  );
}
