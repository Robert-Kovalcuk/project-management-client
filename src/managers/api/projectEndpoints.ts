import BaseFetch, { IResponse } from "@/managers/api/baseFetch"

class ProjectEndpoints extends BaseFetch {
	public create(name: string, category: EProjectCategory, status: string, deadline: Date, totalCost: number, adminId: number): Promise<IResponse<IProject>> {
		return this.postFetch<IProject, IProject>("create", { name, adminId, category, deadline, totalCost, status }, true)
	}

	public update(name: string, category: EProjectCategory, status: string, deadline: Date, totalCost: number, adminId: number): Promise<IResponse<void>> {
		return this.postFetch<IProject, void>("update", { name, adminId, category, deadline, totalCost, status }, true)
	}
}

export enum EProjectCategory {
	hardware = "hardware",
	software = "software"
}

export interface IProject {
	name: string,
	category: EProjectCategory,
	status: string,
	deadline: Date,
	totalCost: number,
	adminId: number
}
