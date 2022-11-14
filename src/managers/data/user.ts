import { IUser } from "@/managers/api/userEndpoints"

export default class User implements IUser {
	public email: string
	public userId: number

	public constructor (email: string, userId: number) {
		this.email = email
		this.userId = userId
	}

	public static fromApi(user: IUser): User {
		return new User(user.email, user.userId)
	}
}
