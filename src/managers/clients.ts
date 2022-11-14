import ClientEndpoints, { IClientDefinition } from "@/managers/api/clientEndpoints"
import { Client } from "@/managers/data/client"

export class Clients {
	public static create(title: string, name: string, from: Date, to: Date, activeLines: number, phone: string, email: string, status: string): Promise<Client> {
		return ClientEndpoints.create(title, name, phone, email, activeLines, from, to , status).then(response => response.content)
	}

	public static get(): Promise<Client[]> {
		return ClientEndpoints.get().then(response => response.content.clients.map(client => Client.fromApi(client)))
	}

	public static getDefinitions(): Promise<IClientDefinition[]> {
		return ClientEndpoints.getDefinitions().then(response => response.content)
	}
}
