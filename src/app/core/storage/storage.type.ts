export type localStorageItem<T> = {
	value: T
	expire: number
}

export type StorageData = {
	token: 'token'
	user: 'user'
}

export type StorageKey = keyof StorageData
