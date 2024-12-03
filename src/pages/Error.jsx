import { useRouteError } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
export default function Error() {
  const err = useRouteError();

  console.log(err?.status);
  if (!err?.status) {
    console.log(err);

    localStorage.clear();
  }

  return (
    <div className="relative z-0 pt-6">
      <Navigation error={err} />
    </div>
  );
}
