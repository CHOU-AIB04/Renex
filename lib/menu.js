import {
  LuBriefcase,
  LuFolderOpen,
  LuHouse,
  LuInfo,
  LuPhone,
} from "react-icons/lu";

// French labels + in-page anchors matching the one-page landing structure
// (some anchors target sections not built yet — Realisations/Contact —
// keep the ids in sync as those sections are added to page.js).
export const navItems = [
  {
    title: "ACCUEIL",
    href: "#",
    icon: LuHouse,
  },
  {
    title: "POURQUOI RENEX",
    href: "#pourquoi",
    icon: LuInfo,
  },
  {
    title: "COMMENT ÇA MARCHE",
    href: "#process",
    icon: LuBriefcase,
  },
  {
    title: "RÉALISATIONS",
    href: "#realisations",
    icon: LuFolderOpen,
  },
  {
    title: "CONTACT",
    href: "#contact",
    icon: LuPhone,
  },
];
