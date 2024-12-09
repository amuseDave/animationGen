import { FileHtml } from "@phosphor-icons/react";

export default function NHTML({ tab, handleTab }) {
  const styles = tab === "html" && "bg-[#e1ff9a41] text-black font-semibold";

  return (
    <div className={`modal-tab ${styles}`} onClick={() => handleTab("html")}>
      <FileHtml
        size={24}
        color="#e34c26
  "
      />
      <p>index.html</p>
    </div>
  );
}
