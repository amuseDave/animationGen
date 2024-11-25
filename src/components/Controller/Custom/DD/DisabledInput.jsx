export default function DisabledInput() {
  return (
    <input
      className="w-full cursor-not-allowed"
      id="animation"
      name="animation"
      type="range"
      min="0"
      disabled
    />
  );
}
