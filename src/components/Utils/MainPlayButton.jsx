export default function PlayAnimationBtn({
  handlePlayAnimation,
  active = true,
}) {
  return (
    <button
      onClick={handlePlayAnimation}
      className={` text-pink-100 bg-pink-950 left-1 btn-animation
    ${!active && "cursor-not-allowed opacity-25"}`}
    >
      Play Animation
    </button>
  );
}
