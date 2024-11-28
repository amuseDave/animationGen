import { useRouteError } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
export default function Error() {
  const err = useRouteError();

  console.log(err.message);

  return (
    <div className="pt-6">
      <Navigation error={err} />
    </div>
  );
}
