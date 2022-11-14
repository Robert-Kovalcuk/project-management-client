import Storable from "@/managers/data/storable"
import User from "@/managers/data/user"

export interface ISession {
	sessionId: string,
	user: User
}

export default class Session extends Storable<ISession | null> {
	public constructor() {
		super("session", sessionStorage)
	}

	public static fromStorage(): ISession | null {
		const sessionJSON = sessionStorage.getItem("session")

		if(!sessionJSON)
			return null

		return (JSON.parse(sessionJSON) as ISession)
	}
}
