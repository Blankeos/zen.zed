import Color from "color";
import { base } from "./_base";

const base_bg = "#1b1e28";

const config = {
  filename: "blankeos-zen",
  name: "Blankeos Zen",
  appearance: "dark",
  "background.appearance": null,
  colors: {
    primary: base.primary,
    background_static: base_bg,
    background: base_bg,
    overlay_background: Color(base_bg).darken(0.4).fade(0.2).hexa(),
    overlay_background_hover: Color(base_bg).darken(0.1).fade(0.1).hexa(),

    "element.background": "#303340",

    "tab_bar.background": Color(base_bg).lighten(0.7).fade(0.5).hexa(),
    "tab.active_background": base_bg,

    "editor.background": `${base_bg}00`,

    "editor.active_line.background": "#b4b4b61a",

    "terminal.background": `${base_bg}00`,

    ignored: "#606586",

    "info.background": "#43525f",

    "tab.background": "#1f222800",
  },
};

export default config;
