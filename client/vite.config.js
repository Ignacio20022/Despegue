import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import dns from 'dns'

dns.setDefaultResultOrder("verbatim") //for localhost inseat of 127.0.0.1

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port:3000,
    },
    plugins: [
        react(),
        ViteEjsPlugin((viteConfig) => ({
            // viteConfig is the current Vite resolved config
            env: viteConfig.env,
        })),
    ],
});
