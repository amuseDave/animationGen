import { useSelector } from "react-redux";
import { Cloud } from "lucide-react";
import logo from "../../assets/logo.png";
import Team from "./Static/Team";

export default function Layout() {
  const type = useSelector((state) => state.ui.type);

  return (
    <>
      <div className="h-full p-3 rounded-2xl bg-saved-bg">
        <div className="flex items-center -translate-x-1">
          <img src={logo} className="w-14 h-14" />
          <h2 className="text-2xl font-semibold text-alert-t-success">
            Pulsewave
          </h2>

          <Cloud className="ml-auto justify-self-end text-alert-t-success" />
        </div>
      </div>
      <Team />
    </>
  );
}
