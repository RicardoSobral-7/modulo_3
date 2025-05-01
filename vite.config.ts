import { defineConfig } from "vitest/config";
// essa lib a baixo é para ela resolver os caminhos no nosso codigo
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
});
