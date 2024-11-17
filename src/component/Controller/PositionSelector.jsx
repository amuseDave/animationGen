import SelectPosition from "./SelectPosition";

export default function PositionSelector() {
  return (
    <div className="w-[180px] h-[140px] bg-slate-500 relative">
      <div className="-translate-x-1/2 -translate-y-full"></div>
      <SelectPosition
        type="center"
        position="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <SelectPosition
        type="center-top"
        position="left-1/2 top-[calc(50%-17px)] -translate-x-1/2 -translate-y-1/2"
      />
      <SelectPosition
        type="center-bottom"
        position="left-1/2 top-[calc(50%+17px)] -translate-x-1/2 -translate-y-1/2"
      />
      <SelectPosition
        type="center-left"
        position="left-[calc(50%-17px)] top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <SelectPosition
        type="center-right"
        position="left-[calc(50%+17px)] top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
