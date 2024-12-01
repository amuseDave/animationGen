import { Book, ChevronDown, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customActions } from "../../../store/customSlicer";
import { customActionsDD } from "../../../store/customDDSlicer";
import { animationActions } from "../../../store/animationsSlicer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { uiActions } from "../../../store/uiSlicer";

export default function Custom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = useSelector((state) => state.ui.type);

  const animations = useSelector((state) => state.animations.custom.animations);
  const curIndex = useSelector((state) => state.animations.custom.curIndex);
  const isDefault = useSelector((state) => state.animations.custom.isDefault);
  const customDefault = useSelector((state) => state.animations.custom.default);

  useEffect(() => {
    setCurAnimation();
  }, [curIndex, isDefault]);

  function setCurAnimation() {
    if (!isDefault) {
      dispatch(
        customActions.handleSetAnimation(animations[curIndex].animation)
      );
      dispatch(
        customActionsDD.handleSetAnimation(animations[curIndex].animationDD)
      );
      dispatch(uiActions.handleDragDrop(animations[curIndex].isDragDrop));
    } else {
      dispatch(customActions.handleSetAnimation(customDefault.animation));
      dispatch(customActionsDD.handleSetAnimation(customDefault.animationDD));
      dispatch(uiActions.handleDragDrop(customDefault.isDragDrop));
    }
  }

  function handleDiffAnimation(index) {
    if (curIndex === index && type === "custom" && !isDefault) return;
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
        {animations.map((animation, index) => {
          const same = index === curIndex && type === "custom" && !isDefault;

          return (
            <motion.div
              layout
              onClick={() => {
                handleDiffAnimation(index);
              }}
              key={animation.id}
              className={`flex items-center mt-1 gap-3 px-2 py-1 transition-colors rounded-md hover:bg-green-800/10 ${
                same && "hover:bg-orange-400/10"
              } ${index === curIndex && "order-first mt-4"}`}
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

              <Trash2
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                size={22}
                className="ml-auto transition-colors text-red-600/20 hover:text-red-600/40"
              />
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
