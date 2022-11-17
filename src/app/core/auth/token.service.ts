import { Injectable } from 'injection-js'
import { BehaviorSubject, Observable, share, Subject, Subscription, timer } from 'rxjs'
import { LocalStorageService } from '../storage/storage.service'
import { Token } from './types'

@Injectable()
export default class TokenService {
	private change$ = new BehaviorSubject<Token | undefined>(undefined)
	private refresh$ = new Subject<Token | undefined>()
	private timer$?: Subscription
	private _token?: Token

	constructor(private store: LocalStorageService) {}

	public get token() {
		if (!this._token) {
			this._token = this.store.get('token')
		}

		return this._token
	}

	change(): Observable<Token | undefined> {
		return this.change$.pipe(share())
	}

	refresh(): Observable<Token | undefined> {
		this.buildRefresh()

		return this.refresh$.pipe(share())
	}

	set(token?: Token) {
		this.save(token)
	}

	private save(token?: Token) {
		this._token = undefined
		if (!token) {
			this.store.remove('token')
		} else {
			token.exp = Date.now() + token.tokenExpire * 1000
			this.store.set('token', token)
		}
		this.buildRefresh()
	}

	private buildRefresh() {
		this.clearRefresh()
		if (this.token) {
			this.timer$ = timer(this.token.exp - Date.now() - 60 * 1000).subscribe(() => {
				this.refresh$.next(this.token)
			})
		}
	}

	private clearRefresh() {
		if (this.timer$ && !this.timer$.closed) {
			this.timer$.unsubscribe()
		}
	}
}
