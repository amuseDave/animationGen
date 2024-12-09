import { FileCss } from "@phosphor-icons/react";

export default function NCSS({ tab, handleTab }) {
  const styles = tab === "css" && "bg-[#e1ff9a41] text-black font-semibold";

  return (
    <div className={`modal-tab ${styles}`} onClick={() => handleTab("css")}>
      <FileCss
        size={24}
        color="#264de4
"
      />
      <p>styles.css</p>
    </div>
  );
}
