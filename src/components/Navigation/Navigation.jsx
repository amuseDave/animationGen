import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { uiActions } from "../../store/uiSlicer";

export default function Navigation({ error }) {
  const type = useSelector((state) => state.ui.type);
  // const dispatch = useDispatch();

  const navClass =
    type === "custom" ? "custom" : type === "featured" ? "featured" : "micro";

  return (
    <nav
      className={`relative mx-auto w-max flex p-[6px] rounded-lg navigation-main ${navClass}`}
    >
      {error ? (
        <>
          {" "}
          <Link className="nav-btn" to="/">
            Custom
          </Link>
          <Link className="nav-btn" to="featured-animations">
            Featured
          </Link>
          <Link className="nav-btn" to="micro-interactions">
            Micro-Int
          </Link>
        </>
      ) : (
        <>
          <NavLink className="nav-btn" to="/">
            Custom
          </NavLink>
          <NavLink className="nav-btn" to="featured-animations">
            Featured
          </NavLink>
          <NavLink className="nav-btn" to="micro-interactions">
            Micro-Int
          </NavLink>
        </>
      )}
    </nav>
  );
}
