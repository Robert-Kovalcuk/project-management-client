import { IPipelineSearchResponse } from "@/managers/api/pipelineEndpoints"
import { Pipeline } from "@/managers/data/pipeline"

export class PipelineSearch {
	public totalCount: number
	public pipelines: Pipeline[]

	public constructor (totalCount: number, pipelines: Pipeline[]) {
		this.totalCount = totalCount
		this.pipelines = pipelines
	}

	public static fromApi(response: IPipelineSearchResponse): PipelineSearch {
		return new PipelineSearch(response.totalCount, response.pipelines.map(pipeline => Pipeline.fromApi(pipeline)))
	}
}
