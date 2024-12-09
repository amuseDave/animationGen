import { useState } from "react";
import NHTML from "./NHTML";
import NCSS from "./NCSS";

// bg-[#e1ff9a41]
export default function NDD() {
  const [tab, setTab] = useState("html");

  function handleTab(tab) {
    setTab(tab);
  }

  return (
    <>
      <div className="modal-tab-container">
        <NHTML tab={tab} handleTab={handleTab} />
        <NCSS tab={tab} handleTab={handleTab} />
      </div>
      <div></div>
    </>
  );
}
