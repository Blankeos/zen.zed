const templatePath = Bun.file("src/template.json5");

import fs from "node:fs";
import path from "node:path";

import blankeosZen from "./variants/blankeos-zen";
import blankeosZenBlurred from "./variants/blankeos-zen-blurred";
import blankeosZenDark from "./variants/blankeos-zen-dark";
import blankeosZenDarkBlurred from "./variants/blankeos-zen-dark-blurred";
// import blankeosZenLight from "./variants/blankeos-zen-light";

const configs = [
  blankeosZen,
  blankeosZenBlurred,
  blankeosZenDark,
  blankeosZenDarkBlurred,
  // blankeosZenLight,
];

import JSON5 from "json5";
import { base } from "./variants/_base";

async function main() {
  const themesDir = path.resolve("../themes");
  await fs.promises.mkdir(themesDir, { recursive: true });

  // Write each config as its own JSON file
  await Promise.all(
    configs.map(async (cfg) => {
      // Replace template placeholders with actual values

      let templateText = await templatePath.text();
      // Helper to recursively flatten nested objects with dot notation
      function flatten(obj: any, prefix = ""): Record<string, any> {
        let out: Record<string, any> = {};
        for (const [k, v] of Object.entries(obj)) {
          const key = prefix ? `${prefix}.${k}` : k;
          if (v && typeof v === "object" && !Array.isArray(v)) {
            out = { ...out, ...flatten(v, key) };
          } else {
            out[key] = v;
          }
        }
        return out;
      }

      // Flatten the config so that nested keys become dot-separated
      const flatCfg = flatten(cfg);

      for (const [key, value] of Object.entries(flatCfg)) {
        // Handle null / undefined values: strip surrounding quotes so the
        // final JSON ends up with a real null instead of the string "null"
        if (value === null || value === undefined) {
          templateText = templateText.replace(
            new RegExp(`"\\{\\{\\s*${key.replace(".", "\\.")}\\s*\\}\\}"`, "g"),
            "null",
          );
          continue; // skip the normal replacement below
        }

        templateText = templateText.replace(
          new RegExp(`\\{\\{\\s*${key.replace(".", "\\.")}\\s*\\}\\}`, "g"),
          String(value),
        );
      }

      const templateContent = JSON5.parse(templateText);
      // Append the base stuff
      templateContent.themes[0].players = [
        ...(templateContent.themes[0].players || []),
        ...base.rainbow.map(({ color, selection }) => ({
          cursor: color,
          selection,
        })),
      ];

      const fileName = `${cfg.filename}.json`;
      const filePath = path.join(themesDir, fileName);
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(templateContent, null, 2),
      );

      console.log(`✅ Done generating ${fileName}!`);
    }),
  );
}

main();
