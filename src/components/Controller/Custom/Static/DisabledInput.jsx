export default function DisabledInput() {
  return (
    <input
      className="flex-grow cursor-not-allowed"
      id="animation"
      name="animation"
      type="range"
      min="0"
      disabled
    />
  );
}
