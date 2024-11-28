import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../../store/customSlicer";

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
      dispatch(
        customActions.handleKeyFrame({ action: "validation", value: "invalid" })
      );
      return;
    }

    // Handle same KF alert
    if (keyFramePers.includes(KF)) {
      inputRef.current.focus();
      dispatch(
        customActions.handleKeyFrame({ action: "validation", value: "same" })
      );
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
    <div className="flex items-center gap-2" id="adding">
      <button
        onClick={handleActive}
        className="mt-1 text-4xl font-bold text-green-500 cursor-none"
      >
        +
      </button>

      {isActive && (
        <>
          <form onSubmit={handleInputSubmit}>
            <input
              ref={inputRef}
              className="w-16 p-1 font-bold text-white border border-green-300 rounded-lg outline-none focus:border-none focus:outline-green-500 bg-slate-700"
              placeholder="0"
              value={inputVal}
              onChange={handleInputChange}
            ></input>
          </form>
          <p className="font-bold text-white">%</p>
        </>
      )}
    </div>
  );
}
