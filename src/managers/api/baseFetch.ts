import CustomError from "@/managers/data/customResponseError"
import Notifications from "@/managers/data/notifications"
import Session from "@/managers/data/session"

export default abstract class BaseFetch {

	private readonly baseURL: string
	private readonly PATH: string
	private readonly GET_INIT = {
		method: "GET",
		headers: { "Content-Type": "application/json" }
	}

	public constructor(path: string) {
		this.PATH = path
		this.baseURL = `http://localhost:8083/${this.PATH}/`
	}

	protected getFetch<T>(endpoint: string, requiresSession: boolean, query?: string): Promise<IResponse<T>> {
		return fetch(
			this.generateURL(endpoint, requiresSession, query),
			this.GET_INIT
		).then(async response => this.evaluateResponse(response))
	}

	protected postFetch<T, N>(endpoint: string, body: T, requiresSession: boolean): Promise<IResponse<N>> {
		const requestBody = this.createRequestBody(body)
		const headers = this.createPostInit(requestBody, requiresSession)

		return fetch(
			this.baseURL + endpoint,
			headers
		).then(async response => this.evaluateResponse(response))
	}

	private addSessionIdToBody<T>(body: T): unknown {
		return Object.defineProperty(body, "sessionId", {
			value: Session.fromStorage()?.sessionId,
			enumerable: true
		})
	}

	private createPostInit<T>(body: T, requiresSession: boolean): Record<string, unknown> {
		return {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(requiresSession ? (this.addSessionIdToBody(body)) : body)
		}
	}

	private generateURL(endpoint: string, requiresSession: boolean, query?: string): string {
		return `${this.baseURL}${endpoint}?${query ?? ""}${requiresSession ? `&sessionId=${Session.fromStorage()!.sessionId}` : ""}`
	}

	private createRequestBody<T>(body: T): IRequest<T> {
		return {
			content: body
		}
	}

	private async evaluateResponse<T>(response: Response): Promise<T> {
		const data = await response.json()

		if(!data.content) {
			Notifications.pushError(data.message)
			throw new CustomError(data.name, data.message, data.status, data.stack)
		}

		return data
	}

}

export interface IRequest<T> {
	content: T
}

export interface IResponse<T> {
	status: number
	content: T
}
