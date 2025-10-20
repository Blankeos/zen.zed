// Massively work in
import { base } from "./_base";

const base_bg = "#f8f9fa";

const config = {
  filename: "blankeos-zen-light",
  name: "Blankeos Zen Light",
  appearance: "light",
  "background.appearance": null,
  colors: {
    primary: base.primary,
    background_static: base_bg,
    background: `${base_bg}d0`,

    "element.background": "#ffffff",
    "tab_bar.background": "#e9ecef",
    "tab.active_background": base_bg,

    "editor.background": `${base_bg}00`,

    "editor.active_line.background": "#636e7d1a",

    "terminal.background": `${base_bg}00`,

    ignored: "#adb5bd",

    "info.background": "#d1ecf1",

    "tab.background": "#f8f9fa00",
  },
};

export default config;
