export interface Token {
	token: string
	tokenExpire: number
	refreshToken: string
	exp: number
	[x: string]: any
}
