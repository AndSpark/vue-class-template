import { Injectable, SkipSelf } from 'injection-js'
import { BehaviorSubject, catchError, map, merge, of, share, switchMap, tap } from 'rxjs'
import { isEmptyObject } from './helper'
import LoginService from './login.service'
import TokenService from './token.service'
import { User } from './types'

@Injectable()
export default class AuthService {
	private user$ = new BehaviorSubject<User>({})
	private change$ = merge(
		this.tokenService.change(),
		this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
	).pipe(
		switchMap(() => this.assgineuser()),
		share()
	)

	constructor(@SkipSelf() private tokenService: TokenService, private loginService: LoginService) {}

	change() {
		return this.change$
	}

	user() {
		return this.user$.pipe(share())
	}

	login() {
		return this.loginService.login().pipe(
			tap(res => this.tokenService.set(res.token)),
			tap(res => this.user$.next(res.user)),
			map(() => this.tokenService.valid)
		)
	}

	logout() {
		return this.loginService.logout().pipe(
			tap(() => this.tokenService.clear()),
			map(() => !this.tokenService.valid)
		)
	}

	refresh() {
		return this.loginService.refresh(this.tokenService.token?.refreshToken).pipe(
			tap(token => this.tokenService.set(token)),
			map(() => this.tokenService.valid)
		)
	}

	private assgineuser() {
		if (!this.tokenService.valid) {
			return of().pipe(tap(user => this.user$.next(user)))
		}
		if (!isEmptyObject(this.user$.getValue())) {
			return of(this.user$.getValue())
		}

		return this.loginService.me().pipe(tap(user => this.user$.next(user)))
	}
}
