import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "index.js"),
      name: "MyComponents",
      fileName: (format) => `my-components.${format}.js`,
      formats: ['es', 'umd'],
      cssFileName: 'my-components',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 如果需要全局引入一些 SCSS 文件
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  }
});
