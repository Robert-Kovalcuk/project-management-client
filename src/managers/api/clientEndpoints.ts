import BaseFetch, { IResponse } from "@/managers/api/baseFetch"
import { Client } from "@/managers/data/client"

class ClientEndpoints extends BaseFetch {
	public create(title: string, name: string, phone: string, email: string, activeLines: number, from: Date, to: Date, status: string): Promise<IResponse<Client>> {
		return this.postFetch<IClient, Client>("create",{title, name, phone, email, activeLines, from, to, status}, true)
	}

	public get(): Promise<IResponse<IClientsResponse>> {
		return this.getFetch("get", true)
	}

	public getDefinitions(): Promise<IResponse<IClientDefinition[]>> {
		return this.getFetch("definitions", true)
	}
}

export interface IClient {
	comments?: string[],
	id?: number
	name: string,
	title: string,
	status: string,
	from: Date,
	to: Date,
	activeLines: number,
	phone: string,
	email: string
}

export interface IClientsResponse {
	clients: IClient[]
	totalCount: number
}

export interface IClientDefinition {
	key: string
	value: string
}

export default new ClientEndpoints("client")
