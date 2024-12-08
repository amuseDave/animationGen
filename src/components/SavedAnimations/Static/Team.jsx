import daveImg from "../../../assets/dave-icon.jpg";
import googleSvg from "../../../assets/svgs/google.svg";
import coverImg from "../../../assets/cover.jpg";

import instagramSvg from "../../../assets/svgs/instagram.svg";
import arrowLeftRight from "../../../assets/svgs/arrow-team-left-right.svg";
import linkedingSvg from "../../../assets/svgs/linkedin.svg";
import googleGraySvg from "../../../assets/svgs/googlegray.svg";
import githubSvg from "../../../assets/svgs/github.svg";
import twitterSvg from "../../../assets/svgs/twitter.svg";
import youtubeSvg from "../../../assets/svgs/youtube.svg";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TEAM from "../../../utils/data";

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const otherIndex = index === 0 ? 1 : 0;

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
            className="p-6 rounded-2xl border border-main-t-gray-active w-[528px] bg-saved-bg absolute bottom-[88px] left-0 overflow-hidden z-[1000] text-[#B8CCC7]"
          >
            <img
              src={coverImg}
              className="absolute top-0 left-0 object-cover w-full h-[92px]"
              alt=""
            />

            {/* ANIMATION OF CHANGE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index} // Unique key to trigger re-render and animation
                initial={{ x: index === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: index === 0 ? 100 : -100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <img
                  src={TEAM[index].img}
                  className="object-cover w-[88px] relative z-10 h-[88px] border rounded-full border-saved-bg mt-6"
                  alt=""
                />
                {/* GOOGLE AND NAME WITH EMAIl START */}
                <div className="flex justify-between mt-3">
                  <div>
                    <p className="text-lg text-main-t-gray-active">
                      {TEAM[index].name}
                    </p>
                    <p className="text-sm text-main-t-gray">
                      {TEAM[index].email}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-[5px] -translate-y-full mt-2">
                    <img src={googleSvg} className="w-6 h-6" />
                    <div className="text-nowrap">
                      <p className="text-[14px]" style={{ lineHeight: 1 }}>
                        Google <br />
                        <span className="text-[12px] text-[#5C6663]">
                          {TEAM[index].google}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* GOOGLE AND NAME WITH EMAIl END */}
                {/* SOCIAL MEDIA ICONS START */}
                <div className="flex pb-4 mt-4 border-b border-[#262928] gap-x-4">
                  <img src={twitterSvg} />
                  <img src={instagramSvg} />
                  <img src={googleGraySvg} />
                  <img src={linkedingSvg} />
                  <img src={youtubeSvg} />
                  <img src={githubSvg} />
                </div>
                {/* SOCIAL MEDIA ICONS END */}
                <p className="mt-4 text-sm text-main-t-gray">Bio</p>
                <p className="mt-1 text-sm text-[#D4E6E1] inter">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi..
                </p>
                <p className="mt-6 text-sm text-main-t-gray">Role</p>
                {/* ROLES START */}
                <div className="flex mt-2 gap-x-4">
                  {TEAM[index].roles.map((role, idx) => (
                    <div
                      style={{
                        backgroundColor: role.bgColor,
                        textColor: role.textColor,
                      }}
                      key={idx}
                      className={`rounded-md py-[5px] pl-2 pr-[10px] flex gap-x-2`}
                    >
                      <img src={role.svg} />
                      <p className={`dm-sans font-medium text-[14px]`}>
                        {role.role}
                      </p>
                    </div>
                  ))}
                </div>
                {/* ROLES END */}
                {/* TEAM SWITCH START*/}
                <div
                  onClick={() => {
                    setIndex(otherIndex);
                  }}
                  className="h-full p-2 mt-4 rounded-md bg-[#171A19] relative
               flex items-center gap-x-2"
                >
                  <img
                    src={TEAM[otherIndex].img}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div>
                    <p style={{ lineHeight: 1.2 }} className="text-[14px]">
                      {TEAM[otherIndex].nickname}
                      <br />
                      <span className="text-[12px] text-[#5C6663]">
                        {TEAM[otherIndex]?.miniRole || TEAM[otherIndex]?.google}
                      </span>
                    </p>
                  </div>
                  <img
                    src={arrowLeftRight}
                    style={{
                      order: index === 1 && "-1",
                      marginLeft: index === 0 && "auto",
                      rotate: index === 1 && "180deg",
                    }}
                  />
                </div>
              </motion.div>
              {/* TEAM SWITCH END*/}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
