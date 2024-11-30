import { useSelector } from "react-redux";

export default function Duration({ handleDuration }) {
  const duration = useSelector((state) => state.custom.duration);

  return (
    <div className="flex items-center gap-2">
      <p className="text-white">Duration</p>
      <input
        type="range"
        min={0.1}
        max={10}
        step={0.1}
        value={duration}
        onChange={handleDuration}
      />
      <p className="text-lg font-semibold text-white">{duration}s</p>
      {/* <input
        className="w-10 p-1 text-xl text-white border-2 rounded-md outline-none bg-slate-800 border-zinc-950"
        type="number"
        placeholder="0.1"
        onChange={handleDuration}
        defaultValue={duration}
      /> */}
    </div>
  );
}
