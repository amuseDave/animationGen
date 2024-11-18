import SelectPosition from "./SelectPosition";
import "./positions.css";

export default function PositionSelector() {
  return (
    <div className="w-[140px] h-[110px] bg-gray-900 relative mt-5">
      <div className="-translate-x-1/2 -translate-y-full"></div>

      {/*Center START */}
      <SelectPosition type="cc" positionStyles="cc" />
      <SelectPosition type="ct" positionStyles="ct" />
      <SelectPosition type="cb" positionStyles="cb" />
      <SelectPosition type="cl" positionStyles="cl" />
      <SelectPosition type="cr" positionStyles="cr" />
      {/*Center END */}

      {/*Center Sides START */}
      <SelectPosition type="lc" positionStyles="lc" />
      <SelectPosition type="rc" positionStyles="rc" />
      <SelectPosition type="lco" positionStyles="lco" />
      <SelectPosition type="rco" positionStyles="rco" />
      {/*Center Sides END */}

      {/*Center Vertical Sides START */}
      <SelectPosition type="tc" positionStyles="tc" />
      <SelectPosition type="bc" positionStyles="bc" />
      <SelectPosition type="tco" positionStyles="tco" />
      <SelectPosition type="bco" positionStyles="bco" />
      {/*Center Vertical Sides END */}

      {/*Top Sides START */}
      <SelectPosition type="tl" positionStyles="tl" />
      <SelectPosition type="tr" positionStyles="tr" />
      <SelectPosition type="tlot" positionStyles="tlot" />
      <SelectPosition type="trot" positionStyles="trot" />
      <SelectPosition type="tlol" positionStyles="tlol" />
      <SelectPosition type="tror" positionStyles="tror" />
      {/*Top Sides END */}

      {/*Bottom Sides START*/}
      <SelectPosition type="bl" positionStyles="bl" />
      <SelectPosition type="br" positionStyles="br" />
      <SelectPosition type="blob" positionStyles="blob" />
      <SelectPosition type="brob" positionStyles="brob" />
      <SelectPosition type="blol" positionStyles="blol" />
      <SelectPosition type="bror" positionStyles="bror" />
      {/*Bottom Sides END*/}
    </div>
  );
}
