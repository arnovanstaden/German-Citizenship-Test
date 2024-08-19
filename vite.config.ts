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
        id: 'Einbürgerungstest',
        name: 'Einbürgerungstest',
        short_name: 'Einbürgerungstest',
        description: 'Bereite dich auf den deutschen Einbürgerungstest vor. Übe mit über 300 Fragen, nimm an Quizzen teil und lerne die Bundesländer kennen.',
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
        screenshots: [
          {
            src: '/static/images/meta/screenshots/narrow.webp',
            sizes: '516x1117',
            type: 'image/webp',
            form_factor: 'narrow'
          },
          {
            src: '/static/images/meta/screenshots/wide.webp',
            sizes: '1226x958',
            type: 'image/webp',
            form_factor: 'wide'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /.*\.(?:css|js|html)/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  }
});
