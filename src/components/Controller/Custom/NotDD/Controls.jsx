import Color from "./Controls/Color";
import Opacity from "./Controls/Opacity";
import Rotate from "./Controls/Rotate";
import Scale from "./Controls/Scale";

export default function Controls() {
  return (
    <>
      <div className="flex flex-col gap-2 mt-5">
        <Color />
        <Opacity />
        <Scale />
        <Rotate />
      </div>
    </>
  );
}
