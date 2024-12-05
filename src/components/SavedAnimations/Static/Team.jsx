import daveImg from "../../../assets/dave-icon.jpg";
import coverImg from "../../../assets/cover.jpg";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      const box = e.target.closest("#feature-box");
      const btn = e.target.closest("#feature-btn");

      if (box || btn) return;

      setIsOpen(false);
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative h-full px-4 py-2 bg-saved-bg rounded-2xl">
      <p className="text-main-t-gray">Team</p>

      <div className="flex mt-2">
        <img
          src={daveImg}
          className="object-cover border rounded-full w-7 h-7 border-saved-bg"
          alt=""
        />
        <img
          src={daveImg}
          className="object-cover -translate-x-3 border rounded-full w-7 h-7 border-saved-bg"
          alt=""
        />
        <p className="text-main-t-gray-active">Dovydas & Shaheer</p>
      </div>

      <ChevronUp
        id="feature-btn"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        size={18}
        className={`transition-transform absolute rc right-4 text-main-t-gray ${
          isOpen && "rotate-180 text-main-t-active"
        }`}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="feature-box"
            animate={{ opacity: [0, 1] }}
            exit={{ opacity: 0 }}
            className="pt-12 px-6 rounded-2xl border border-main-t-gray-active h-[400px] w-[500px] bg-saved-bg absolute bottom-[88px] left-0 overflow-hidden z-[1000]"
          >
            <img
              src={coverImg}
              className="absolute top-0 left-0 object-cover w-full h-24"
              alt=""
            />
            <img
              src={daveImg}
              className="object-cover w-24 h-24 -translate-x-3 border rounded-full border-saved-bg"
              alt=""
            />
            <p className="mt-4 text-xl text-main-t-gray-active">AmuseDave</p>
            <p className="text-sm text-main-t-gray">amusedave@gmail.com</p>

            <div className="flex pb-2 mt-2 border-b-2 border-zinc-800">
              Social media icons
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
