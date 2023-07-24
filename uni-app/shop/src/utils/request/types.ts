import type { AxiosRequestConfig } from 'axios'

/**
 * request 返回结果类型
 */
export interface ServiceResult<T = any> {
  code: number
  msg: string
  data?: T
}

/**
 * 请求数据类型
 */
export enum ContentTypeEnum {
  JSON = 'application/json',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  FORM_DATA = 'multipart/form-data',
}

export type ErrorMessageMode = 'none' | 'message' | undefined

export interface RequestOptions {
  isTransformResponse?: boolean
  isReturnNativeResponse?: boolean
  errorMessageMode?: ErrorMessageMode
}

/**
 * request config 参数类型
 */
export interface CustomRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions
}

/**
 * 业务约定的全局错误码
 */
export enum ServiceResultCodeEnum {
  // 响应成功
  SUCCESS = 0,
  // 服务器内部错误
  ERROR = -1,
  // 暂无数据
  NO_DATA = 700,
  // 当前登录 token 无效, 请重新登录
  LOGIN_EXPIRED = 2000,
}