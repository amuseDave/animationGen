import AnimationRangeControl from "../Static/AnimationRangeControl";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

export default function AnimationRangeHandler() {
  const dispatch = useDispatch();
  const {} = useSelector((state) => {
    return {};
  });

  return (
    <AnimationRangeControl value="" max="" handleAnimationRange={() => {}} />
  );
}
