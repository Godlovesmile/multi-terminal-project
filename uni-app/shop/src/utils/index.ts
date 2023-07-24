/**
 * 获取接口前缀
 */
export function getAPI(code = 'api') {
  const host: string = import.meta.env.PROD ? import.meta.env.VITE_APP_API_HOST : location.host
  const origin = `${location?.protocol || 'https:'}//${host}`
  const baseURL = import.meta.env.PROD ? `/${import.meta.env.VITE_APP_SUB_DOMAIN}` : '/dev-api'
  const api = `${origin}${baseURL}` // 基础接口

  switch (code) {
    case 'host':
      return host
    case 'origin':
      return origin
    default:
      return api
  }
}
