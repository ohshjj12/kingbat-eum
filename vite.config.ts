import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import aitDevtools from "@apps-in-toss/devtools/unplugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [aitDevtools.vite(), react()],
  server: {
    allowedHosts: ['kingbat-eum.kpearl.net'],
  },
  preview: {
    allowedHosts: ['kingbat-eum.kpearl.net'],
  },
})
