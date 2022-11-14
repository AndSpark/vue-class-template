import { resolveInstances } from '@/app/utils/injection'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Injectable } from 'injection-js'
import { setupApi } from 'szpt-driver-api'
import httpInterceptorProviders from './interceptor'
import AbstractInterceptor from './interceptor/abstract-interceptor'

@Injectable()
export class HttpService {
	private instance: AxiosInstance = axios.create()
	private httpInterceptors: AbstractInterceptor[] = resolveInstances(httpInterceptorProviders)

	constructor() {
		this.setup()
	}

	private setup() {
		setupApi(this.request.bind(this) as any)
	}

	public request<T = any>(originConfig: AxiosRequestConfig<T>) {
		const resolveList: any[] = []
		const rejectList: any[] = []
		let config = originConfig

		const next = (c: AxiosRequestConfig<T>) =>
			new Promise<AxiosResponse>((resolve, reject) => {
				config = c
				resolveList.push(resolve)
				rejectList.push(reject)
			})

		this.httpInterceptors.forEach(v => v.interceptor(config, next))

		return new Promise((resolve, reject) => {
			this.instance
				.request(config)
				.then(async response => {
					let res = response
					try {
						for (const item of resolveList) {
							res = (await item(res)) || res
						}
					} catch (error) {
						console.log(error)
					}
					resolve(res)
				})
				.catch(async error => {
					let err = error
					try {
						for (const item of rejectList) {
							err = (await item(err)) || err
						}
					} catch (error) {
						console.log(error)
					}
					reject(err)
				})
		})
	}
}
