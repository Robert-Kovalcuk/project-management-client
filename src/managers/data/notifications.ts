import CustomResponseError from "@/managers/data/customResponseError"
import Vue from "vue"

interface IErrorState {
	errors: CustomResponseError[]
}

class Notifications {
	private errorsState: IErrorState

	public constructor () {
		this.errorsState = Vue.observable({
			errors: []
		})
	}

	public hasError(): boolean {
		return this.errorsState.errors.length !== 0
	}

	public pushError(error: CustomResponseError): void {
		if(this.errorsState.errors.includes(error))
			return

		this.errorsState.errors.push(error)
	}

	public popError(): CustomResponseError | undefined {
		return this.errorsState.errors.pop()
	}

	public get currentError(): CustomResponseError {
		return this.errorsState.errors[this.errorsState.errors.length - 1]
	}
}

export default new Notifications()
