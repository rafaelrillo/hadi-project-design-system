import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Library build configuration for @fing/design-system
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      '@molecules': path.resolve(__dirname, './src/components/molecules'),
      '@organisms': path.resolve(__dirname, './src/components/organisms'),
      '@templates': path.resolve(__dirname, './src/components/templates'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    lib: {
      entry: {
        components: path.resolve(__dirname, 'src/components/index.ts'),
        hooks: path.resolve(__dirname, 'src/hooks/index.ts'),
        contexts: path.resolve(__dirname, 'src/contexts/index.ts'),
        store: path.resolve(__dirname, 'src/store/index.ts'),
        services: path.resolve(__dirname, 'src/services/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'framer-motion',
        'zustand',
        'echarts',
        'echarts-for-react',
        'lucide-react',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    outDir: 'dist/lib',
    cssCodeSplit: true,
  },
})
