import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlicer";

export default function Navigation() {
  const dispatch = useDispatch();

  // function handleTheme() {
  //   dispatch(uiActions.toggleTheme());
  // }

  return (
    <section className="flex items-center justify-center">
      {/* <div></div> */}
      <nav className="flex p-[6px] border border-white rounded-lg from-background bg-green-950 bg-gradient-to-tr">
        <NavLink className="nav-btn" to="/">
          Custom
        </NavLink>
        <NavLink className="nav-btn" to="featured-animations">
          Featured
        </NavLink>
        <NavLink className="nav-btn" to="micro-interactions">
          Micro-Int
        </NavLink>
      </nav>

      {/* <div
        onClick={handleTheme}
        className="self-end cursor-pointer justify-self-end place-self-end"
      >
        change Theme
      </div> */}
    </section>
  );
}
