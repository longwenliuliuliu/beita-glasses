import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 开发服务器配置
  server: {
    port: 5173,
    open: true,
    // 启用 HTTPS（摄像头访问需要）
    // https: true,
  },
  
  // 构建优化
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          vto: ['jeelizvtowidget'],
        },
      },
    },
    // 资源内联阈值
    assetsInlineLimit: 4096,
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 生成 sourcemap（生产环境可关闭）
    sourcemap: false,
  },
  
  // 依赖优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'jeelizvtowidget'],
  },
  
  // 资源处理
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
})
