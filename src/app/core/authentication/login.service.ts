import { Injectable } from 'injection-js'
import { of } from 'rxjs'
import { Token, User } from './types'

@Injectable()
export default class LoginService {
	login() {
		return of({} as { user: User; token: Token })
	}

	refresh(refreshToken?: string) {
		return of({} as Token)
	}

	logout() {
		return of()
	}

	me() {
		return of({} as User)
	}
}
