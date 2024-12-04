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
      <div className="library-title-container">
        <Book size={22} /> <h1>Custom library</h1>{" "}
        <ChevronDown size={22} className="library-title-container-icon" />
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
                index === 0 && "mt-3"
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
                className={`library-animation-title ${
                  same && "library-animation-title-active"
                }`}
                animationName={animation.name}
              />

              <Trash2
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                size={22}
                className="library-animation-delete"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
