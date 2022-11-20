export interface Token {
	token: string
	tokenExpire: number
	refreshToken: string
	exp: number
	[prop: string]: any
}

export interface User {
	[prop: string]: any
	username?: string
}
