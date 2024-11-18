import SelectPosition from "./SelectPosition";
import "./positions.css";

export default function PositionSelector() {
  return (
    <div className="w-[140px] h-[110px] bg-gray-900 relative mt-5">
      <div className="-translate-x-1/2 -translate-y-full"></div>

      {/*Center START */}
      <SelectPosition type="center" positionStyles="cc" />
      <SelectPosition type="center-top" positionStyles="ct" />
      <SelectPosition type="center-bottom" positionStyles="cb" />
      <SelectPosition type="center-left" positionStyles="cl" />
      <SelectPosition type="center-right" positionStyles="cr" />
      {/*Center END */}

      {/*Center Sides START */}
      <SelectPosition type="left-center" positionStyles="lc" />
      <SelectPosition type="right-center" positionStyles="rc" />
      <SelectPosition type="left-center-outside" positionStyles="lco" />
      <SelectPosition type="right-center-outside" positionStyles="rco" />
      {/*Center Sides END */}

      {/*Center Vertical Sides START */}
      <SelectPosition type="top-center" positionStyles="tc" />
      <SelectPosition type="bottom-center" positionStyles="bc" />
      <SelectPosition type="top-center-outside" positionStyles="tco" />
      <SelectPosition type="bottom-center-outside" positionStyles="bco" />
      {/*Center Vertical Sides END */}

      {/*Top Sides START */}
      <SelectPosition type="top-left" positionStyles="tl" />
      <SelectPosition type="top-right" positionStyles="tr" />
      <SelectPosition type="top-left-outside-top" positionStyles="tlot" />
      <SelectPosition type="top-right-outside-top" positionStyles="trot" />
      <SelectPosition type="top-left-outside-left" positionStyles="tlol" />
      <SelectPosition type="top-right-outside-right" positionStyles="tror" />
      {/*Top Sides END */}

      {/*Bottom Sides START*/}
      <SelectPosition type="bottom-left" positionStyles="bl" />
      <SelectPosition type="bottom-right" positionStyles="br" />
      <SelectPosition type="bottom-left-outside-bottom" positionStyles="blob" />
      <SelectPosition
        type="bottom-right-outside-bottom"
        positionStyles="brob"
      />
      <SelectPosition type="bottom-left-outside-left" positionStyles="blol" />
      <SelectPosition type="bottom-right-outside-right" positionStyles="bror" />
      {/*Bottom Sides END*/}
    </div>
  );
}
