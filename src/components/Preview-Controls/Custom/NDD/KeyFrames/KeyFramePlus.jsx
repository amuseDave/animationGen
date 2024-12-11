import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";
import kfAddSvg from "../../../../../assets/svgs/keyframeaddbtn.svg";
import { toast } from "react-toastify";

let invalidNotification;
let sameNotification;

export default function KeyFramePlus() {
  const keyFramePers = useSelector((state) => state.custom.keyFramePers);

  const dispatch = useDispatch();
  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [inputVal, setInputVal] = useState("");

  // Set empty value on keyFramePers update
  useEffect(() => {
    setInputVal(``);
  }, [keyFramePers]);

  // Handle offClick to blur on addBtn
  useEffect(() => {
    if (!isActive) return;
    function handleBlur(e) {
      const addEl = e.target.closest("#adding");
      if (addEl) return;
      setIsActive(false);
    }
    window.addEventListener("click", handleBlur);
    return () => {
      window.removeEventListener("click", handleBlur);
    };
  }, [isActive]);

  // Handle input from 1 to 99
  function handleInputChange(e) {
    const val = e.target.value;
    if (inputVal === "0" && val !== "") setInputVal(val.slice(-1));
    if (val === "" || (+val >= 1 && +val <= 99)) {
      setInputVal(val);
    }
  }

  // handle show input for adding, and submission if it's showing
  function handleActive() {
    if (isActive) {
      handleSubmit();
      return;
    }
    setIsActive(true);
  }

  // Handle submission
  function handleInputSubmit(e) {
    e.preventDefault();
    handleSubmit();
  }

  function handleSubmit() {
    const KF = +inputRef.current.value;

    const isValid = KF > 0 && KF < 100;

    // Handle Invalid KF alert
    if (!isValid) {
      inputRef.current.focus();
      ///
      if (invalidNotification) return;
      invalidNotification = true;
      setTimeout(() => {
        invalidNotification = false;
      }, 1000);
      toast.error("Invalid keyframe!");
      ///
      return;
    }

    // Handle same KF alert
    if (keyFramePers.includes(KF)) {
      inputRef.current.focus();
      ///
      if (sameNotification) return;
      sameNotification = true;
      setTimeout(() => {
        sameNotification = false;
      }, 1000);
      toast.error("Can't add same keyframe!");
      ///
      return;
    }

    // Add keyFrame
    setIsActive(false);
    dispatch(customActions.handleKeyFrame({ value: KF, action: "add" }));
  }

  useEffect(() => {
    if (isActive) inputRef.current.focus();
  }, [isActive]);

  return (
    <div
      className="relative preview-controller-box-item"
      id="adding"
      onClick={handleActive}
    >
      <img src={kfAddSvg} className="scale-[1.5] " />

      {isActive && (
        <>
          <form
            className="absolute -top-2 left-0 -translate-y-full text-[#CFE5DF]"
            onSubmit={handleInputSubmit}
          >
            <div className="preview-controller-box-item">
              <input
                style={{
                  width: `${`${inputVal}`.length * 6 + 13}px`,
                }}
                ref={inputRef}
                className="preview-controller-value-input"
                placeholder="0"
                value={inputVal}
                onChange={handleInputChange}
              ></input>
              <p className="font-medium">%</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
