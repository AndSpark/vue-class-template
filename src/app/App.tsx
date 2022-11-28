import { RouterView } from 'vue-router'
import { Component, VueComponent } from 'vue3-oop'
import AuthService from './core/authentication/auth.service'
import TokenService from './core/authentication/token.service'
import { HttpService } from './core/http/http'
import RouterStart from './core/router'

@Component({
	providers: [RouterStart, AuthService, HttpService, TokenService],
})
export default class App extends VueComponent {
	constructor() {
		super()
	}

	render() {
		return <RouterView></RouterView>
	}
}
