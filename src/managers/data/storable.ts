export default abstract class Storable<T> {
	private readonly STORAGE_KEY: string
	private readonly WINDOW_STORAGE: Storage
	private data: T | null

	protected constructor(storageKey: string, storageType: Storage) {
		this.STORAGE_KEY = storageKey
		this.WINDOW_STORAGE = storageType

		this.data = this.getFromStorage()
	}

	private isStorageAvailable(): boolean {
		return !!this.WINDOW_STORAGE
	}

	public getStorageKey(): string {
		return this.STORAGE_KEY
	}

	public getData(): T | null {
		return this.data
	}

	public setData(data: T): void {
		this.data = data
		this.saveToStorage()
	}

	public hasData(): boolean {
		return this.data !== null
	}

	private saveToStorage(): boolean {
		if(!this.isStorageAvailable())
			return false

		this.WINDOW_STORAGE.setItem(this.STORAGE_KEY, JSON.stringify(this.data))

		return true
	}

	public getFromStorage(): T | null {
		if(!this.isStorageAvailable())
			return null

		const data = this.WINDOW_STORAGE.getItem(this.STORAGE_KEY)

		return data ? JSON.parse(data) : null
	}

	public deleteFromStorage(): void {
		this.WINDOW_STORAGE.removeItem(this.STORAGE_KEY)
	}
}
