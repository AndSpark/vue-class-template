import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable, SkipSelf } from 'injection-js'
import TokenService from '../../authentication/token.service'
import AbstractInterceptor, { AxiosRequest } from './abstract-interceptor'

@Injectable()
export default class TokenInterceptor implements AbstractInterceptor {
	constructor(@SkipSelf() private tokenService: TokenService) {}

	interceptor(
		request: AxiosRequestConfig<any>,
		next: AxiosRequest
	): Promise<AxiosResponse<any, any>> {
		if (this.tokenService.valid && request.withCredentials !== false) {
			if (request.headers) {
				request.headers!['Authorization'] = this.tokenService.token!.token
			} else {
				request.headers = {
					Authorization: this.tokenService.token!.token,
				}
			}
			request.withCredentials = true
		}
		return next(request)
			.then(res => res)
			.catch(err => {
				if (err.status === 401) {
					this.tokenService.clear()
				}
				return err
			})
	}
}
