import { Token } from '../authentication/types'

export type localStorageItem<T> = {
	value: T
	expire: number
}

export type StorageData = {
	token: Token
	user: 'user'
}

export type StorageKey = keyof StorageData
