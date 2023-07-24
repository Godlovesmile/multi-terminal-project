import { createRequest as request } from '@/utils/request'
/**
 * banner 列表
 */
// Recordable
export function bannerList(data?: any) {
  console.log('=== enter list ===')
  return request({
    url: '/banner/list',
    method: 'get',
    params: data,
  })
}

export default { bannerList }
