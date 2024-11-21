import PlayAnimationBtn from "../Static/PlayAnimationBtn";
import ResetAnimationBtn from "../Static/ResetAnimationBtn";

export default function PlayResetBtn() {
  return (
    <>
      <PlayAnimationBtn
        handlePlayAnimation={() => {
          console.log("handle play animation not DD");
        }}
        active={false}
      />
      <ResetAnimationBtn
        handleResetAnimation={() => {
          console.log("handle reset animation not DD");
        }}
        active={true}
      />
    </>
  );
}
