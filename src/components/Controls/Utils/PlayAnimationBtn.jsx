export default function PlayAnimationBtn({
  handlePlayAnimation,
  active = true,
}) {
  return (
    <button
      onClick={handlePlayAnimation}
      className={`
    absolute text-pink-100 rounded-md font-light text-lg bg-pink-950 bc bottom-5 py-1 text-center w-40 
    ${!active && "cursor-not-allowed opacity-25"}`}
    >
      Play Animation
    </button>
  );
}
