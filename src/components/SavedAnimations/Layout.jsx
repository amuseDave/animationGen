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
      <div className="library-panel-container">
        <div className="logo-container">
          <img src={logo} className="logo-container-img" />
          <h2 className="logo-container-title">Pulsewave</h2>

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
