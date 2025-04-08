import { defineConfig } from "vite";
import handlebars from 'vite-plugin-handlebars';
import { resolve } from "path";

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'login.html',
        signin: 'signin.html',
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials')
    }),
  ],
  assetsInclude: ['**/*.hbs']
})
