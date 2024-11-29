import { Book, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { customActions } from "../../../store/customSlicer";
import { customActionsDD } from "../../../store/customDDSlicer";
import { animationActions } from "../../../store/animationsSlicer";
import { uiActions } from "../../../store/uiSlicer";

export default function Custom() {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.ui.type);

  const animations = useSelector((state) => state.animations.custom.animations);
  const curIndex = useSelector((state) => state.animations.custom.curIndex);

  function setCurAnimation() {
    dispatch(customActions.handleSetAnimation(animations[curIndex].animation));
    dispatch(
      customActionsDD.handleSetAnimation(animations[curIndex].animationDD)
    );
  }

  function handleDiffAnimation(index) {
    if (curIndex === index && type === "custom") return;

    if (type !== "custom") dispatch(uiActions.handleTypeChange("custom"));

    dispatch(animationActions.updateCustom({ action: "index", index }));
  }

  useEffect(() => {
    setCurAnimation();
  }, [curIndex]);
  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <Book size={22} /> <h1>Custom library</h1>{" "}
        <ChevronDown size={22} className="ml-auto" />
      </div>

      {animations.map((animation, index) => {
        const same = index === curIndex && type === "custom";

        return (
          <div
            onClick={() => {
              handleDiffAnimation(index);
            }}
            key={uuidv4()}
            className={`flex items-center gap-3 px-2 py-2 mt-4 transition-colors rounded-md hover:bg-green-800/10 ${
              same && "hover:bg-orange-400/10"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full bg-green-200 ${
                same && "bg-orange-500"
              }`}
            ></div>
            <p
              className={`text-main-t-gray ${
                same && "text-main-t-gray-active"
              }`}
            >
              {animation.name}
            </p>
          </div>
        );
      })}
    </>
  );
}
