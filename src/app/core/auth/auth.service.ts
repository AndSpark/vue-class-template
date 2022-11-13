import { Injectable } from 'injection-js'

@Injectable()
export default class AuthService {
	hello() {
		console.log('hello')
	}
}
