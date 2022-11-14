import { EPipelineStatus, IComments, IPipeline } from "@/managers/api/pipelineEndpoints"

export class Pipeline {
	public id: number
	public name: string
	public contactPerson: string
	public address: string
	public country: string
	public city: string
	public status: EPipelineStatus
	public comments: string[]
	public note: string

	public constructor (name: string, contactPerson: string, address: string, country: string, city: string, status: EPipelineStatus, id: number, comments: string[], note: string) {
		this.id = id
		this.name = name
		this.contactPerson = contactPerson
		this.address = address
		this.country = country
		this.city = city
		this.status = status
		this.comments = comments
		this.note = note
	}

	public static fromApi(pipeline: IPipeline): Pipeline {
		return new Pipeline(
			pipeline.name,
			pipeline.contactPerson,
			pipeline.address,
			pipeline.country,
			pipeline.city,
			pipeline.status,
			pipeline.id!,
			pipeline.comments?.comments ?? [],
			pipeline.note!
		)
	}
}
