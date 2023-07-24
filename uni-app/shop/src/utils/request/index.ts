import axios from 'axios'
import { getAPI } from '@/utils'
import qs from 'qs'
import {
  type ServiceResult,
  type CustomRequestConfig,
  ContentTypeEnum,
  // RequestOptions,
  ServiceResultCodeEnum,
} from './types'
import type { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'

axios.defaults.adapter = mpAdapter

// 请求拦截器 AxiosRequestConfig
const _interceptorsRequest = (config: any) => {
  // TODO: add token 追加 token
  const joinPlayloadData = (data: any) => {
    return { ...data, token: '' }
  }

  // 序列化数据
  const contentType = config.headers?.['Content-Type']

  if (contentType === ContentTypeEnum.FORM_URLENCODED) {
    if (['post', 'put', 'patch'].includes(config.method as string)) {
      config.data = qs.stringify(joinPlayloadData(config.data))
    }

    if (['delete', 'get', 'head'].includes(config.method as string)) {
      config.params = joinPlayloadData(config.params)
    }
  }

  return config
}

const _instanceConfig = {
  // 基础接口地址
  baseURL: getAPI(),
  // 请求超时事件
  timeout: 1000 * 5,
  // 使用 form-urlencoded 格式, 即伪表单
  headers: {
    'Content-Type': ContentTypeEnum.FORM_URLENCODED,
  },
}

/**
 * 创建 request 实例
 */

export function createRequest<T = ServiceResult>(config: CustomRequestConfig): Promise<T> {
  const requestOptions = {
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 是否返回原生响应头 比如:需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 消息提示类型
    errorMessageMode: 'message',
    ...config.requestOptions,
  }

  // 1. 创建 axios 实例
  const instance: AxiosInstance = axios.create(_instanceConfig)
  // 2. 请求拦截器
  instance.interceptors.request.use(_interceptorsRequest)

  // 3. 响应拦截器
  // 请求拦截器
  // AxiosResponse<any>
  const _interceptorsResponse = (response: any) => {
    const result: ServiceResult = response.data
    const { code } = result

    // 不进行任何处理, 直接返回原生响应
    if (requestOptions.isReturnNativeResponse) {
      return response
    }

    // 不进行任何处理, 直接返回数据
    if (!requestOptions.isTransformResponse) {
      return result
    }

    if (Number(code) === ServiceResultCodeEnum.SUCCESS) {
      return result
    } else if (Number(code) === ServiceResultCodeEnum.NO_DATA) {
      result.data = null
      return result
    } else {
      // TODO: error tips
      // serviceErrorHandel(result, requestOptions as RequestOptions)
      return Promise.reject(result)
    }
  }
  instance.interceptors.response.use(_interceptorsResponse, (error: AxiosError) => {
    // 处理错误信息提醒
    return Promise.reject(error)
  })

  return new Promise((resolve, reject) => {
    instance
      .request<any, AxiosResponse<ServiceResult>>(config)
      .then((res: AxiosResponse<ServiceResult>) => {
        resolve(res as unknown as Promise<T>)
      })
      .catch((e: Error | AxiosError) => {
        // TODO: error tips
        reject(e)
      })
  })
}
