# vite-env-autocomplete

### Change, Remvoe and Delete your env anytime.

Get typescript intellisense on your defined environment variable when you use as `import.meta.env`

![GIF](https://files.catbox.moe/fzhwkt.gif)

# Easy Installation

```js
npm i vite-env-autocomplete
```

After the installation import `viteEnvAutoComplete` and use it inside pluggins in `vite.config.js` file

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteEnvAutoComplete from "vite-env-autocomplete";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteEnvAutoComplete()],
});
```

## Thats All
