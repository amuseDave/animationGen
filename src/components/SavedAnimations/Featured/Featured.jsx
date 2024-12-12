import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { animationActions } from "../../../store/animationsSlicer";

export default function Featured({ svg, svg2 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.ui.type);
  const animationNames = useSelector(
    (state) => state.animations.featured.animationNames
  );
  const activeIndex = useSelector(
    (state) => state.animations.featured.activeIndex
  );

  function handleDiffAnimation(index) {
    if (activeIndex === index && type === "featured") return;
    if (type !== "featured") navigate("/featured-animations");
    dispatch(animationActions.handleFeaturedIndex(index));
  }

  return (
    <>
      <div className="flex gap-2 text-main-t-gray">
        <img src={svg} /> <h1>Featured library</h1>{" "}
        <img src={svg2} className="ml-auto" />
      </div>

      <div>
        {animationNames.map((animation, index) => {
          const same = index === activeIndex && type === "featured";
          const styles = same && "library-animation-container-active";

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
                  className={`library-dot ${same && "library-dot-active"}`}
                ></div>
              </div>

              {animation.name}
            </div>
          );
        })}
      </div>
    </>
  );
}
