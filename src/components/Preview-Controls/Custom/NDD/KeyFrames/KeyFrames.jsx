import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import KeyFrame from "./KeyFrame";

export default function KeyFrames() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const keyFramesPers = useSelector((state) => state.custom.keyFramePers);
  const activeKeyFrame = useSelector((state) => state.custom.activeKeyFrame);

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
    <>
      <div className="w-full bg-[#080A0A] h-[50%] mt-[1px] z-[9999]">
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
        </div>
      </div>
      <div className="h-full"></div>
    </>
  );
}
