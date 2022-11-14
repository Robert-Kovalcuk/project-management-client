import PipelineEndpoints, { EPipelineStatus, IPipelineDefinition } from "@/managers/api/pipelineEndpoints"
import { Pipeline } from "@/managers/data/pipeline"
import { PipelineSearch } from "@/managers/data/PipelineSearch"

export class Pipelines {
	public static search(size: number, index: number, sortBy: string, search: string): Promise<PipelineSearch> {
		return PipelineEndpoints.getPage(size, index, sortBy, search).then(response => ({ totalCount: response.content.totalCount, pipelines: response.content.pipelines.map(pipe => Pipeline.fromApi(pipe)) }))
	}

	public static update(id: number, name: string, contactPerson: string, address: string, country: string, city: string, status: EPipelineStatus, notes: string, comments: string[]): Promise<Pipeline | void> {
		return PipelineEndpoints.update(id, name, contactPerson, address, country, city, status, {comments: comments}, notes).then(response => Pipeline.fromApi(response.content))
	}

	public static get(id: number): Promise<Pipeline> {
		return PipelineEndpoints.get(id).then(response => Pipeline.fromApi(response.content))
	}

	public static getDefinitions(): Promise<IPipelineDefinition[]> {
		return PipelineEndpoints.getDefinitions().then(response => response.content)
	}

	public static addComment(comment: string, name: string): Promise<boolean> {
		return PipelineEndpoints.addComment(comment, name).then()
	}

	public static addNote(note: string, name: string): Promise<boolean> {
		return PipelineEndpoints.addNote(note, name).then()
	}
}
