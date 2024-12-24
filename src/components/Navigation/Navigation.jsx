import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { uiActions } from "../../store/uiSlicer";

export default function Navigation({ error }) {
  const type = useSelector((state) => state.ui.type);
  // const dispatch = useDispatch();

  const navClass =
    type === "featured" ? "featured" : type === "micro" && "micro";

  return (
    <nav className={`navigation-main-container ${navClass}`}>
      {error ? (
        <>
          <Link className="nav-btn cursor-[inherit]" to="/">
            Custom
          </Link>
          <Link className="nav-btn cursor-[inherit]" to="featured-animations">
            Featured
          </Link>
          <Link className="nav-btn cursor-[inherit]" to="micro-interactions">
            Micro-Int
          </Link>
        </>
      ) : (
        <>
          <NavLink className="nav-btn cursor-[inherit]" to="/">
            Custom
          </NavLink>
          <NavLink
            className="nav-btn cursor-[inherit]"
            to="featured-animations"
          >
            Featured
          </NavLink>
          <NavLink className="nav-btn cursor-[inherit]" to="micro-interactions">
            Micro-Int
          </NavLink>
        </>
      )}
    </nav>
  );
}
