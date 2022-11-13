import { RouterView } from 'vue-router'
import { Component, VueComponent } from 'vue3-oop'
import AuthService from './core/auth/auth.service'
import { HttpService } from './core/http/http'
import RouterStart from './core/router'

@Component({ providers: [RouterStart, AuthService, HttpService] })
export default class App extends VueComponent {
	render() {
		return <RouterView></RouterView>
	}
}
