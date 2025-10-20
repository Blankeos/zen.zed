import Color from "color";
import { base } from "./_base";

const base_bg = "#1b1e28";

const config = {
  filename: "blankeos-zen-blurred",
  name: "Blankeos Zen (Blurred)",
  appearance: "dark",
  "background.appearance": "blurred",
  colors: {
    primary: base.primary,
    background_static: base_bg,
    background: `${base_bg}d0`,
    overlay_background: Color(base_bg).darken(0.4).fade(0.2).hexa(),
    overlay_background_hover: Color(base_bg).darken(0.1).fade(0.1).hexa(),

    "element.background": "#30334000",

    "tab_bar.background": Color(base_bg).lighten(0.5).fade(1).hexa(),
    "tab.active_background": base_bg,

    "scrollbar.track_background": `${base_bg}00`,

    "editor.active_line.background": "#93c5fd1d",

    "terminal.background": `${base_bg}00`,

    ignored: "#606586",

    "info.background": "#43525f",

    // Unified aliases for shared colors
    "editor.background": "#12121200",

    "tab.background": "#1f222800",
  },
};

export default config;
