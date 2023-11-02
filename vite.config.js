import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default ({ mode }) => defineConfig({
  plugins: [vue(),

    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icon/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      components: resolve(__dirname, './src/components'),
      views: resolve(__dirname, './src/views')
      // "*": resolve(""),
    }
    // extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  server: {
    proxy: {
      '/api': {
        target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
