import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Einbürgerungstest',
        short_name: 'Einbürgerungstest',
        description: 'YBereite dich auf den deutschen Einbürgerungstest vor. Übe mit über 300 Fragen, nimm an Quizzen teil und lerne die Bundesländer kennen.',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/static/images/meta/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/static/images/meta/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  }
});
