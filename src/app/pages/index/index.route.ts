import AuthService from '@/app/core/authentication/auth.service'
import { Injectable, SkipSelf } from 'injection-js'
import type { RouteRecord } from 'vue-router'

@Injectable()
export default class IndexRoute implements Partial<RouteRecord> {
	constructor(@SkipSelf() private authService: AuthService) {}

	path = '/'
	component = () => import('./index.page')

	beforeEnter: RouteRecord['beforeEnter'] = (to, from, next) => {
		next()
	}
}
