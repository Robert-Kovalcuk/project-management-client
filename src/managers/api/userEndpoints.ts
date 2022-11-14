import BaseFetch, { IResponse } from "@/managers/api/baseFetch"

class UserEndpoints extends BaseFetch {
	public create(email: string, password: string): Promise<IResponse<IUser>> {
		return this.postFetch<IRegisterRequest, IUser>("create", {email, password}, false)
	}

	public login(email: string, password: string): Promise<IResponse<ILoginResponse>> {
		return this.postFetch<ILoginRequest, ILoginResponse>("login", {email, password}, false)
	}

	public me(): Promise<IResponse<IUser>> {
		return this.getFetch("me",true)
	}

	public delete(userId: number): Promise<IResponse<IWasSuccess>> {
		return this.postFetch<{userId: number}, IWasSuccess>("delete", { userId }, true)
	}
}
export interface IWasSuccess {
	wasSuccess: boolean
}

export interface IRegisterRequest {
	email: string,
	password: string
}

export interface ILoginRequest {
	email: string,
	password: string
}

export interface ILoginResponse {
	sessionId: string,
	user: IUser
}

export interface IUser {
	email: string,
	userId: number
}

export default new UserEndpoints("user")
