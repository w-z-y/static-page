import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  // npm run build:lib
  const isLib = mode === "lib";

  const baseConfig = {
    base: "./",
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  };

  if (isLib) {
    return {
      ...baseConfig,
      build: {
        outDir: "lib",
        lib: {
          entry: resolve(__dirname, "index.js"),
          name: "MyComponents",
          fileName: (format) => `my-components.${format}.js`,
          formats: ["es", "umd"],
          cssFileName: "my-components",
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue",
            },
            paths: {
              // 注意此配置只能在当前项目中使用，
              vue: "../../lib/vue3.min.js",
            },
          },
        },
      },
    };
  }

  return {
    ...baseConfig,
  };
});
