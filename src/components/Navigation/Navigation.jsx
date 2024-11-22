import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlicer";

export default function Navigation() {
  const dispatch = useDispatch();

  function handleTheme() {
    dispatch(uiActions.toggleTheme());
  }

  return (
    <section className="flex items-center justify-between px-10">
      <h1 className="text-2xl font-bold">LOGO</h1>
      <nav className="flex justify-center gap-3">
        <NavLink className="nav-btn" to="/">
          Custom
        </NavLink>
        <NavLink className="nav-btn" to="featured-animations">
          Featured Animations
        </NavLink>
        <NavLink className="nav-btn" to="micro-interactions">
          Micro-Interactions
        </NavLink>
      </nav>

      <div onClick={handleTheme} className="cursor-pointer">
        change Theme
      </div>
    </section>
  );
}
