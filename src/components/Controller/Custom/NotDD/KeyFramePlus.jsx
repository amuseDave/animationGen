import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../../store/customSlicer";

export default function KeyFramePlus() {
  const keyFramePers = useSelector((state) => state.custom.keyFramePers);

  const dispatch = useDispatch();
  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setInputVal(``);
  }, [keyFramePers]);

  function handleActive(boolean) {
    setIsActive(boolean);
  }

  function handleInputChange(e) {
    const val = e.target.value;
    if (inputVal === "0" && val !== "") setInputVal(val.slice(-1));
    if (val === "" || (+val >= 1 && +val <= 99)) {
      setInputVal(val);
    }
  }

  function handleInputSubmit(e) {
    e.preventDefault();
    const KF = +inputRef.current.value;
    const isValid = KF > 0 && KF < 100;
    if (!isValid) return;

    // Handle validation alert
    if (keyFramePers.includes(KF)) {
      dispatch(
        customActions.handleKeyFrame({ action: "validation", value: false })
      );
      return;
    }

    inputRef.current.blur();
    dispatch(customActions.handleKeyFrame({ value: KF, action: "add" }));
  }

  useEffect(() => {
    if (isActive) inputRef.current.focus();
  }, [isActive]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleActive(true)}
        className="mt-1 text-4xl font-bold text-green-500 cursor-none"
      >
        +
      </button>
      {isActive && (
        <>
          <form onSubmit={handleInputSubmit}>
            <input
              onBlur={() => setIsActive(false)}
              ref={inputRef}
              className="w-16 p-1 font-bold text-white border border-green-300 rounded-lg outline-none focus:border-none focus:outline-green-500 bg-slate-700"
              type="number"
              max={100}
              min={0}
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
