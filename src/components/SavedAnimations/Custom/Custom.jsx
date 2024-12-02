import { Book, ChevronDown, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { animationActions } from "../../../store/animationsSlicer";
import { useNavigate } from "react-router-dom";
import AnimationName from "./AnimationName";

export default function Custom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = useSelector((state) => state.ui.type);
  const animationNames = useSelector(
    (state) => state.animations.custom.animationNames
  );
  const curIndex = useSelector((state) => state.animations.custom.curIndex);

  function handleDiffAnimation(index) {
    if (curIndex === index && type === "custom") return;
    if (type !== "custom") navigate("/");
    dispatch(animationActions.handleCustomUpdateIndex(index));
  }

  function handleDelete(e, index) {
    e.stopPropagation();
    dispatch(
      animationActions.handleAddRemoveCustom({ action: "remove", index })
    );
  }

  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <Book size={22} /> <h1>Custom library</h1>{" "}
        <ChevronDown size={22} className="ml-auto" />
      </div>

      <div className="flex flex-col">
        {animationNames.map((animation, index) => {
          const same = index === curIndex && type === "custom";
          const isShared = animation.isShared;

          const styles =
            isShared && same
              ? "hover:bg-red-800/10"
              : same
              ? "hover:bg-orange-400/10"
              : isShared
              ? "hover:bg-red-600/10"
              : "hover:bg-green-800/10";

          return (
            <div
              onClick={() => {
                handleDiffAnimation(index);
              }}
              key={animation.id}
              className={`flex items-center mt-1 gap-3 px-2 py-1 transition-colors rounded-md ${styles} ${
                index === 0 && "mt-4"
              }`}
            >
              <div
                className={`w-[7px] h-[6px] rounded-full ${
                  isShared ? "bg-red-500" : "bg-green-200"
                } ${isShared && same ? "bg-red-800" : same && "bg-orange-500"}`}
              ></div>

              <AnimationName
                className={`text-main-t-gray ${
                  same && "text-main-t-gray-active"
                }`}
                animationName={animation.name}
              />

              <Trash2
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                size={22}
                className="ml-auto transition-colors text-red-600/20 hover:text-red-600/40"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
