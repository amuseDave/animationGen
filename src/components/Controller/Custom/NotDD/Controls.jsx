import Color from "./Controls/Color";
import Opacity from "./Controls/Opacity";
import Scale from "./Controls/Scale";

export default function Controls() {
  return (
    <>
      <div className="flex flex-col gap-2 mt-10">
        <Color />
        <Opacity />
        <Scale />
      </div>
    </>
  );
}
