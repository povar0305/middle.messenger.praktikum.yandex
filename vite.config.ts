import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        login: 'login.html',
        signin: 'signin.html',
        404: '404.html',
        500: '500.html',
        profile: 'profile.html',
        chats: 'chats.html',
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
  assetsInclude: ['**/*.hbs'],
});
