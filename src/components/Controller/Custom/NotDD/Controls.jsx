import circleTriangle from "../../../../assets/svgs/circle-triangle.svg";
import convertShape from "../../../../assets/svgs/convertshape.svg";

import Color from "./Controls/Color";
import Opacity from "./Controls/Opacity";
import Rotate from "./Controls/Rotate";
import Scale from "./Controls/Scale";
import { useDispatch } from "react-redux";
import { customActions } from "../../../../store/customSlicer";
import { throttle } from "lodash";
import TextColor from "./Controls/TextColor";

export default function Controls() {
  const dispatch = useDispatch();

  const handleStyle = throttle((e, action) => {
    const { value } = e.target;

    dispatch(customActions.handleStyles({ action, value }));
  }, 8);

  return (
    <>
      <div className="mt-8">
        <div className="control-title control-main-color">
          <img src={circleTriangle} />
          Styles
        </div>

        <div className="controls-container">
          <Color handleStyle={handleStyle} />
          <TextColor handleStyle={handleStyle} />
          <Opacity handleStyle={handleStyle} />
        </div>
      </div>

      <div className="mt-6">
        <div className="control-title control-main-color">
          <img src={convertShape} />
          Properties
        </div>

        <div className="controls-container">
          <Scale />
          <Rotate handleStyle={handleStyle} />
        </div>
      </div>
    </>
  );
}
