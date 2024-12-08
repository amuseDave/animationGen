import conceptSvg from "../assets/svgs/ConceptSVG.svg";
import developedSvg from "../assets/svgs/DevelopedSvg.svg";
import UIUXSvg from "../assets/svgs/UIUXSvg.svg";
import DaveFull from "../assets/dave-icon.jpg";
import ShaheerFull from "../assets/ShaheerFull.png";

const TEAM = [
  {
    img: DaveFull,
    name: "Dovydas Salkevicius",
    email: "amuseddavid@gmail.com",
    google: "Front-End Developer",
    nickname: "amuseDave",
    miniRole: "Developed & Concept",
    roles: [
      {
        role: "Concept",
        textColor: "#FFFCE5",
        svg: conceptSvg,
        bgColor: "#1A180D",
      },

      {
        role: "Developed",
        textColor: "#E5FFEF",
        svg: developedSvg,
        bgColor: "#0D1A12",
      },
    ],
  },
  {
    img: ShaheerFull,
    nickname: "Shaheer",
    google: "UI UX Designer",
    name: "Shaheer Inayat Ali",
    email: "shaheer_eminent@hotmail.com",
    roles: [
      {
        role: "UI UX Design",
        textColor: "#FFFCE5",
        bgColor: "#181A0B",
        svg: UIUXSvg,
      },
    ],
  },
];

export default TEAM;
