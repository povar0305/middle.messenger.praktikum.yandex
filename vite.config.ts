import { defineConfig } from 'vite';

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
        'update-profile': 'update-profile.html',
        chats: 'chats.html',
      },
    },
  },
});
