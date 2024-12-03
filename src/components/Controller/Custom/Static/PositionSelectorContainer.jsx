import PositionSelector from "./PositionSelector";

export default function PositionSelectorContainer() {
  return (
    <div className="">
      <div className="w-[140px] h-[100px] bg-gray-900 mt-5 relative m-auto">
        <div className="-translate-x-1/2 -translate-y-full"></div>

        {/*Center START */}
        <PositionSelector type="cc" positionStyles="cc" />
        <PositionSelector type="ct" positionStyles="ct" />
        <PositionSelector type="cb" positionStyles="cb" />
        <PositionSelector type="cl" positionStyles="cl" />
        <PositionSelector type="cr" positionStyles="cr" />
        {/*Center END */}

        {/*Center Sides START */}
        <PositionSelector type="lc" positionStyles="lc" />
        <PositionSelector type="rc" positionStyles="rc" />
        <PositionSelector type="lco" positionStyles="lco" />
        <PositionSelector type="rco" positionStyles="rco" />
        {/*Center Sides END */}

        {/*Center Vertical Sides START */}
        <PositionSelector type="tc" positionStyles="tc" />
        <PositionSelector type="bc" positionStyles="bc" />
        <PositionSelector type="tco" positionStyles="tco" />
        <PositionSelector type="bco" positionStyles="bco" />
        {/*Center Vertical Sides END */}

        {/*Top Sides START */}
        <PositionSelector type="tl" positionStyles="tl" />
        <PositionSelector type="tr" positionStyles="tr" />
        <PositionSelector type="tlot" positionStyles="tlot" />
        <PositionSelector type="trot" positionStyles="trot" />
        <PositionSelector type="tlol" positionStyles="tlol" />
        <PositionSelector type="tror" positionStyles="tror" />
        {/*Top Sides END */}

        {/*Bottom Sides START*/}
        <PositionSelector type="bl" positionStyles="bl" />
        <PositionSelector type="br" positionStyles="br" />
        <PositionSelector type="blob" positionStyles="blob" />
        <PositionSelector type="brob" positionStyles="brob" />
        <PositionSelector type="blol" positionStyles="blol" />
        <PositionSelector type="bror" positionStyles="bror" />
        {/*Bottom Sides END*/}
      </div>
    </div>
  );
}
