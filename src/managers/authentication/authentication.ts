import {$watch} from "@/utilities/watcher"
import Session from "@/managers/data/session"
import User from "@/managers/data/user"
import UserEndpoints from "../api/userEndpoints"
import Vue from "vue"

export enum EAuthenticated {
	authenticated,
	not_authenticated,
	checking
}

interface IAuthenticatedStatus {
	authenticated: EAuthenticated
}

class Authentication {
	private session: Session = new Session()
	private authenticatedState: IAuthenticatedStatus

	public get isAuthenticated(): EAuthenticated {
		return this.authenticatedState.authenticated
	}

	public constructor() {
		this.authenticatedState = Vue.observable({
			authenticated: EAuthenticated.checking
		})

		this.isSessionAlive().then(is => {
			if(is)
				this.authenticatedState.authenticated = EAuthenticated.authenticated
			else {
				this.authenticatedState.authenticated = EAuthenticated.not_authenticated
				this.session.deleteFromStorage()
			}
		})
	}

	public login(email: string, password: string): Promise<void> {
		return UserEndpoints.login(email, password).then(result => {
			if(!result)
				this.authenticatedState.authenticated = EAuthenticated.not_authenticated

			this.session = new Session()
			this.session.setData({
				sessionId: result!.content.sessionId,
				user: result!.content.user
			})

			this.authenticatedState.authenticated = EAuthenticated.authenticated
		}).catch(error => {
			console.error(error)
		})
	}

	public logout(): void {
		this.session.deleteFromStorage()
		this.authenticatedState.authenticated = EAuthenticated.not_authenticated
	}

	public async checkLoginStatus(): Promise<boolean> {
		switch (this.authenticatedState.authenticated) {
			case EAuthenticated.authenticated:
				return true
			case EAuthenticated.not_authenticated:
				return false
			case EAuthenticated.checking:
				return new Promise((resolve => {
					$watch(
						() => this.authenticatedState.authenticated,
						state => resolve(state === EAuthenticated.authenticated))
				}))
		}
	}

	private async isSessionAlive(): Promise<boolean> {
		if(!this.session.hasData())
			return false

		return UserEndpoints.me().then(success => !!success).catch(() => false)
	}

	public getUser(): User {
		return this.session.getData()!.user
	}

	public getSessionId(): string | undefined {
		return this.session.getData()?.sessionId
	}
}

export default new Authentication()
