import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@consts": path.resolve(__dirname, "src/consts"),
        "@style": path.resolve(__dirname, "src/style"),
        "@store": path.resolve(__dirname, "src/store"),
        "@router": path.resolve(__dirname, "src/router"),
        "@components": path.resolve(__dirname, "src/components"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@api": path.resolve(__dirname, "src/api"),
        "@views": path.resolve(__dirname, "src/views"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
    base: './', // 打包路径
    server: {
      port: 9000, // 服务器端口号
      open: true, // 服务器启动时是否自动打开浏览器
      proxy: {
        // 选项写法
        '/pmt-api': {
          target: 'http://localhost:9088/api/app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/pmt-api/, '')
        },
      }
    },

  });
