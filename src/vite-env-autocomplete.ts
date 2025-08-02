import { type Plugin } from "vite";
import fs from "fs";
import path from "path";
import * as prettier from "prettier";

function viteEnvAutoComplete(): Plugin {
  return {
    name: "vite-env-autocomplete",
    apply: "serve",
    async buildStart() {
      try {
        if (process.env.NODE_ENV !== "development") return;
        const dirs = fs.readdirSync(path.resolve(), { recursive: false });
        const envVars: Set<string> = new Set();

        dirs.forEach((envFile: string | Buffer<ArrayBufferLike>) => {
          if (typeof envFile === "string" && envFile.includes(".env")) {
            const readEnv = fs.readFileSync(path.resolve(envFile), { encoding: "utf-8" });
            const vars = readEnv.split("\n");
            vars.forEach((i) => {
              const variable = i.split("=")?.[0];
              if (variable) envVars.add(variable);
            });
          }
        });

        const d = Array.from(envVars.keys());

        const interfaceObj = d.reduce((acc, item) => {
          acc += `readonly ${item}: string;`;
          return acc;
        }, "");

        const buildInterface = `/// <reference types="vite/client" />\ninterface ImportMetaEnv \n{${interfaceObj}}`;
        const formatted = await prettier.format(buildInterface, { parser: "typescript" });

        const stream = fs.createWriteStream(path.resolve("src/vite-env.d.ts"), {
          encoding: "utf-8",
        });

        stream.write(formatted);
        stream.close();
      } catch (err) {
        console.error(err);
      }
    },
  };
}

export default viteEnvAutoComplete;
