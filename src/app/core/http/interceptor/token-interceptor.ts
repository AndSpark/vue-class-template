import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from 'injection-js'
import AbstractInterceptor, { AxiosRequest } from './abstract-interceptor'

@Injectable()
export default class TokenInterceptor implements AbstractInterceptor {
	interceptor(
		request: AxiosRequestConfig<any>,
		next: AxiosRequest
	): Promise<AxiosResponse<any, any>> {
		return next(request).then(res => res)
	}
}
