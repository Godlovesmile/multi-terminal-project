import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)

  console.log('=== app ===', app)
  return {
    app,
  }
}
