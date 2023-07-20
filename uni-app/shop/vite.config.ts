import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import uniUi from "@dcloudio/uni-ui"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
});
