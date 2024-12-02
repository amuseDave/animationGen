import Color from "./Controls/Color";
import Opacity from "./Controls/Opacity";
import Rotate from "./Controls/Rotate";
import Scale from "./Controls/Scale";
import { useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { throttle } from "lodash";
import Duration from "./Controls/Duration";

export default function Controls() {
  const dispatch = useDispatch();

  const handleStyle = throttle((e, action) => {
    const { value } = e.target;

    dispatch(customActions.handleStyles({ action, value }));
  }, 8);

  return (
    <>
      <div className="flex flex-col gap-1 mt-5">
        <Color handleStyle={handleStyle} />
        <Scale handleStyle={handleStyle} />
        <Opacity handleStyle={handleStyle} />
        <Rotate handleStyle={handleStyle} />
        <Duration handleStyle={handleStyle} />
      </div>
    </>
  );
}
