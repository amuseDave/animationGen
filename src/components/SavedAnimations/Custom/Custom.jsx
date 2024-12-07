import { Trash2 } from "lucide-react";
import trashSvg from "../../../assets/svgs/trashSvg.svg";
import { useDispatch, useSelector } from "react-redux";

import { animationActions } from "../../../store/animationsSlicer";
import { useNavigate } from "react-router-dom";
import AnimationName from "./AnimationName";

export default function Custom({ svg, svg2 }) {
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
      <div className="library-title-container">
        <img src={svg} /> <h1>Custom library</h1>
        <img src={svg2} className="ml-auto" />
      </div>

      <div>
        {animationNames.map((animation, index) => {
          const same = index === curIndex && type === "custom";
          const isShared = animation.isShared;

          const styles =
            isShared && same
              ? "library-animation-container-shared-active"
              : same
              ? "library-animation-container-active"
              : isShared && "library-animation-container-shared ";

          return (
            <div
              onClick={() => {
                handleDiffAnimation(index);
              }}
              key={animation.id}
              className={`library-animation-container ${styles} ${
                index === 0 && "mt-[22px]"
              } group`}
            >
              <div>
                <div
                  className={`library-dot ${isShared && "library-dot-shared"} ${
                    isShared && same
                      ? "library-dot-shared-active"
                      : same && "library-dot-active"
                  }`}
                ></div>
              </div>

              <AnimationName
                isShared={isShared}
                animationName={animation.name}
              />

              <img
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                src={trashSvg}
                className="library-animation-delete"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
