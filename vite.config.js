import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project URL: https://devshailendra.github.io/employee-management-api/
// For a portfolio repo named "DevShailendra.github.io", change base to "/".
export default defineConfig({
  plugins: [react()],
  base: '/developer-portfolio/',
})
