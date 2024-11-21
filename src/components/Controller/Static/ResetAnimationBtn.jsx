export default function ResetAnimationBtn({
  handleResetAnimation,
  active = true,
}) {
  return (
    <button
      onClick={handleResetAnimation}
      className={`text-pink-100 bg-purple-950 right-4 btn-animation
    ${active && "cursor-not-allowed opacity-25"}`}
    >
      Reset Animation
    </button>
  );
}
