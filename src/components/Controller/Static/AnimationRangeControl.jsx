export default function InputRangeControl({
  handleAnimationRange,
  className,
  ...props
}) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <label htmlFor="animation">Animation:</label>
      <input
        className="cursor-move"
        onChange={handleAnimationRange}
        id="animation"
        name="animation"
        type="range"
        min="0"
        {...props}
      />
    </div>
  );
}
