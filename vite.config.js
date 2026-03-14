import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react()],
        server: {
            port: 5173,
            open: true
        },
        build: {
            outDir: 'dist',
            sourcemap: false,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                        antd: ['antd', '@ant-design/icons'],
                        refined: ['@refinedev/core', '@refinedev/react-router-v6'],
                        charts: ['recharts']
                    }
                }
            },
            chunkSizeWarningLimit: 1000,
            minify: 'terser'
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || mode),
            'import.meta.env.VITE_DEBUG': JSON.stringify(env.VITE_DEBUG || 'false'),
            'import.meta.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(env.VITE_CLOUDINARY_CLOUD_NAME || 'do8jotiuq'),
            'import.meta.env.VITE_ENV': JSON.stringify(env.VITE_ENV || 'development'),
            'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://jinka-city-backend.onrender.com')
        }
    }
})
