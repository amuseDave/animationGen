import logo from "../../assets/logo.png";
import Team from "./Static/Team";
import SavedLibraries from "./SavedLibraries";
import Loading from "./Static/Loading";
import { useDispatch } from "react-redux";
import { animationActions } from "../../store/animationsSlicer";
import NewCanvas from "./Custom/NewCanvas";
import UpdateCanvasState from "./Custom/UpdateCanvasState";

export default function Layout() {
  const dispatch = useDispatch();
  dispatch(animationActions.getSavedAnimations());

  return (
    <>
      <div className="relative h-full p-4 select-none rounded-2xl bg-saved-bg">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8" />
          <h2 className="text-2xl font-semibold text-alert-t-success">
            Pulsewave
          </h2>

          <Loading />
        </div>

        <UpdateCanvasState />
        <NewCanvas />
        {/* Saved Animations */}
        <SavedLibraries />
      </div>
      <Team />
    </>
  );
}
