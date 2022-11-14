<template lang="pug">
	v-flex(v-if="loaded" )
		v-row
			v-col(sm="6")
				pipeline-fields-card(:pipeline="pipeline" @save="save" @cancel="cancel")
			v-col(sm="6")
				pipeline-comments-card(:comments.sync="comments" @comment="addComment")
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator"
	import Authentication from "@/managers/authentication/authentication"
	import { Pipeline } from "@/managers/data/pipeline"
	import PipelineCommentsCard from "@/components/pipelines/pipelineCommentsCard.vue"
	import PipelineFieldsCard from "@/components/pipelines/pipelineFieldsCard.vue"
	import { Pipelines } from "@/managers/pipelines"
	import Vue from "vue"

	@Component({
		components: { PipelineCommentsCard, PipelineFieldsCard }
	})
	export default class PipelineView extends Vue {
		@Prop()
		private id!: number

		private pipeline: Pipeline | null = null
		private loaded = false

		private isEditing = false

		private get comments(): string[] {
			return this.pipeline!.comments
		}

		public created(): void {
			this.loadPipeline().then(() => {
				this.loaded = true
			})
		}

		private loadPipeline(): Promise<void> {
			return Pipelines.get(this.id).then(pipeline => {
				this.pipeline = pipeline
			})
		}

		private addComment(payload: string): void {
			Pipelines.addComment(`${Authentication.getUser().email}: ${payload}`, this.pipeline!.name).then(() => {
				this.loadPipeline()
			})
		}

		private save(): void {
			this.isEditing = false

			Pipelines.update(
				this.pipeline!.id,
				this.pipeline!.name,
				this.pipeline!.contactPerson,
				this.pipeline!.address,
				this.pipeline!.country,
				this.pipeline!.city,
				this.pipeline!.status,
				this.pipeline!.note,
				this.pipeline!.comments
			).then(() => this.loadPipeline())
		}

		private cancel(): void {
			this.isEditing = false
			this.loadPipeline()
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
