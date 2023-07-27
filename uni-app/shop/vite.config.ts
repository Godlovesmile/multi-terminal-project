import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'

// 当前执行 node 命令时文件夹的地址(工作目录)
const root: string = process.cwd()

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root)

  return {
    plugins: [
      uni(),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'jsx', 'tsx'],
        dts: 'src/components.d.ts',
      })
    ],
    server: {
      host: true,
      port: Number(env.VITE_PORT),
      proxy: {
        '/dev-api': {
          target: `https://${env.VITE_APP_API_HOST}/${env.VITE_APP_SUB_DOMAIN}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  }
}
