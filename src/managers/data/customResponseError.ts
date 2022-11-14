export default class CustomResponseError extends Error {
	public name: string
	public message: string
	public status: number
	public stack: string

	public constructor (name: string, message: string, status: number, stack?: string) {
		super(message)

		this.name = name
		this.message = message
		this.stack = stack ?? "no error stack"
		this.status = status
	}
}
