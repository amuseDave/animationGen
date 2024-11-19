import Position from "./Position.jsx";
import "./positions.css";

export default function PositionSelector() {
  return (
    <div className="w-[140px] h-[110px] bg-gray-900 relative mt-5 justify-self-center">
      <div className="-translate-x-1/2 -translate-y-full"></div>

      {/*Center START */}
      <Position type="cc" positionStyles="cc" />
      <Position type="ct" positionStyles="ct" />
      <Position type="cb" positionStyles="cb" />
      <Position type="cl" positionStyles="cl" />
      <Position type="cr" positionStyles="cr" />
      {/*Center END */}

      {/*Center Sides START */}
      <Position type="lc" positionStyles="lc" />
      <Position type="rc" positionStyles="rc" />
      <Position type="lco" positionStyles="lco" />
      <Position type="rco" positionStyles="rco" />
      {/*Center Sides END */}

      {/*Center Vertical Sides START */}
      <Position type="tc" positionStyles="tc" />
      <Position type="bc" positionStyles="bc" />
      <Position type="tco" positionStyles="tco" />
      <Position type="bco" positionStyles="bco" />
      {/*Center Vertical Sides END */}

      {/*Top Sides START */}
      <Position type="tl" positionStyles="tl" />
      <Position type="tr" positionStyles="tr" />
      <Position type="tlot" positionStyles="tlot" />
      <Position type="trot" positionStyles="trot" />
      <Position type="tlol" positionStyles="tlol" />
      <Position type="tror" positionStyles="tror" />
      {/*Top Sides END */}

      {/*Bottom Sides START*/}
      <Position type="bl" positionStyles="bl" />
      <Position type="br" positionStyles="br" />
      <Position type="blob" positionStyles="blob" />
      <Position type="brob" positionStyles="brob" />
      <Position type="blol" positionStyles="blol" />
      <Position type="bror" positionStyles="bror" />
      {/*Bottom Sides END*/}
    </div>
  );
}
