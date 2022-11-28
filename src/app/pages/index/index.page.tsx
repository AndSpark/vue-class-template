import TokenService from '@/app/core/authentication/token.service'
import { authApi } from 'szpt-driver-api'
import { Component, VueComponent } from 'vue3-oop'

export default class LoginPage extends VueComponent {
	init() {
		authApi.me.getMe()
	}

	render() {
		return <div>hello</div>
	}
}
