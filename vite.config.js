import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default ({ mode }) => defineConfig({
  plugins: [vue()],
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
