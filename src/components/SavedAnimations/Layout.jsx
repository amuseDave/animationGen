import { Cloud } from "lucide-react";
import logo from "../../assets/logo.png";
import Team from "./Static/Team";
import SavedLibraries from "./SavedLibraries";

export default function Layout() {
  return (
    <>
      <div className="relative h-full p-4 select-none rounded-2xl bg-saved-bg">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8" />
          <h2 className="text-2xl font-semibold text-alert-t-success">
            Pulsewave
          </h2>
          <Cloud className="ml-auto justify-self-end text-alert-t-success" />
        </div>

        {/* Saved Animations */}
        <SavedLibraries />
      </div>
      <Team />
    </>
  );
}
