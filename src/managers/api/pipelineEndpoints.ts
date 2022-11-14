import BaseFetch, { IResponse } from "@/managers/api/baseFetch"

class PipelineEndpoints extends BaseFetch {
	public create(name: string, contactPerson: string, address: string, country: string, city: string, status: EPipelineStatus = EPipelineStatus.notStarted): Promise<IResponse<IPipeline>> {
		return this.postFetch<IPipeline, IPipeline>("create", {name, contactPerson, address, country, city, status}, true)
	}

	public update(id: number, name: string, contactPerson: string, address: string, country: string, city: string, status: EPipelineStatus = EPipelineStatus.notStarted, comments: IComments, note: string): Promise<IResponse<IPipeline>> {
		return this.postFetch<IPipeline, IPipeline>("update", {id, name, contactPerson, address, country, city, status, comments, note}, true)
	}

	public getPage(size: number, index: number, sortBy: string, search: string): Promise<IResponse<IPipelineSearchResponse>> {
		return this.getFetch("search",true, `size=${size}&index=${index}&sortBy=${sortBy}&search=${search}`)
	}

	public addComment(comment: string, pipelineName: string): Promise<IResponse<boolean>> {
		return this.postFetch<IAddCommentRequest, boolean>("addComment", {comment, pipelineName}, true)
	}

	public addNote(note: string, pipelineName: string): Promise<IResponse<boolean>> {
		return this.postFetch<IAddNoteRequest, boolean>("addNote", {note, pipelineName}, true)
	}

	public get(id: number): Promise<IResponse<IPipeline>> {
		return this.postFetch<{id: number}, IPipeline>("get", {id}, true)
	}

	public getDefinitions(): Promise<IResponse<IPipelineDefinition[]>> {
		return this.getFetch("definitions", true)
	}
}

export interface IPipeline {
	name: string,
	contactPerson: string,
	address: string,
	country: string,
	city: string,
	status: EPipelineStatus,
	comments?: IComments,
	id?: number
	note?: string
}
export interface IComments {comments: string[]}

export enum EPipelineStatus {
	notStarted = "not started",
	inProgress = "in progress",
	done = "done"
}

export interface IAddCommentRequest {
	pipelineName: string,
	comment: string
}

export interface IAddNoteRequest {
	pipelineName: string,
	note: string
}

export interface IPipelineSearchResponse {
	totalCount: number,
	pipelines: IPipeline[]
}

export interface IPipelineDefinition {
	key: string,
	value: string
}

export default new PipelineEndpoints("pipeline")
