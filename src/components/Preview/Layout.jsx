import Alerts from "./Alerts.jsx";
import ZoomControls from "./Static/ZoomControls.jsx";

import Preview from "./Preview.jsx";

export default function Layout() {
  return (
    <>
      <Preview />
      <Alerts />
      <ZoomControls />
    </>
  );
}
