import Controls from "./NotDD/Controls";
import Canvas from "./NotDD/Canvas";
import convertShape from "../../../assets/svgs/convertshape.svg";

export default function CustomController() {
  return (
    <>
      <Controls />

      <div className="mt-5">
        <div className="control-title control-main-color">
          <img src={convertShape} />
          Translate
        </div>
        <Canvas />
      </div>
    </>
  );
}
