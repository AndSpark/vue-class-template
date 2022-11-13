import AuthService from '@/app/core/auth/auth.service'
import { Injectable, SkipSelf } from 'injection-js'
import { authApi } from 'szpt-driver-api'
import type { RouteRecord } from 'vue-router'

@Injectable()
export default class IndexRoute implements Partial<RouteRecord> {
	constructor(@SkipSelf() private authService: AuthService) {}

	path = '/'
	component = () => import('./index.page')

	beforeEnter: RouteRecord['beforeEnter'] = (to, from, next) => {
		this.authService.hello()
		authApi.me.getMe()

		next()
	}
}
