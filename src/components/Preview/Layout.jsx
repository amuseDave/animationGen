import Alerts from "./Alerts.jsx";
import DefaultCanvas from "./Static/DefaultCanvas.jsx";
import ZoomControls from "./Static/ZoomControls.jsx";

import Preview from "./Preview.jsx";

export default function Layout() {
  return (
    <section className="relative h-[720px] overflow-hidden rounded-xl">
      <h2 className="absolute text-white top-5 left-5">Animation Name</h2>
      <ZoomControls />
      <DefaultCanvas />
      <Preview />
      <Alerts />
    </section>
  );
}
