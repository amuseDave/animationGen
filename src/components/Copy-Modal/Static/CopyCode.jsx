import { Copy } from "lucide-react";

export default function CopyCode({ tab }) {
  return (
    <Copy
      onClick={() => {
        let textToCopy = "";
        if (tab === "html") {
          textToCopy = document.querySelector(".modal-html p").textContent;
        } else if (tab === "css") {
          textToCopy = document.querySelector(".modal-css p").textContent;
        }

        navigator.clipboard
          .writeText(textToCopy)
          .then(() => console.log("Success"))
          .catch((err) => alert("Failed to copy: " + err));
      }}
      strokeWidth={2.4}
      className="absolute transition-all right-10 bottom-9 text-white hover:text-[#E1FF9A]"
    />
  );
}
