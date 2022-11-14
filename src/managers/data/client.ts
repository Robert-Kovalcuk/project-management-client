import { IClient } from "@/managers/api/clientEndpoints"

export class Client {
	public id: number
	public title: string
	public name: string
	public email: string
	public from: Date
	public to: Date
	public phone: string
	public activeLines: number
	public status: string

	public comments: string[]

	public constructor (activeLines: number, email: string, from: Date, name: string, phone: string, status: string, title: string, to: Date, id: number, comments: string[]) {
		this.id = id
		this.activeLines = activeLines
		this.email = email
		this.from = from
		this.name = name
		this.phone = phone
		this.status = status
		this.title = title
		this.to = to
		this.comments = comments
	}

	public static fromApi(client: IClient): Client {
		return new Client(
			client.activeLines,
			client.email,
			client.from,
			client.name,
			client.phone,
			client.status,
			client.title,
			client.to,
			client.id!,
			client.comments!
		)
	}
}
