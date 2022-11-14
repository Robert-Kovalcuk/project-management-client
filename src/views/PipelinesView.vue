<template lang="pug">
	.pipelines(v-if="loaded")
		v-card(flat).ma-2
			v-data-table(
				:headers="headers"
				:items="items"
				:page.sync="pageIndex"
				:server-items-length="totalCount"
				:search="searchQuery"
				@update:page="loadPipelines().then()"
				@update:sort-by="sort($event)"
			).pa-2
				template(v-slot:top)
					v-text-field.mx-4(v-model='searchQuery' label="Search" @input="search" append-icon="mdi-magnify" )
				template(v-slot:item="{ item }")
					data-table-row(:headers="headers" :item="item")
		create-pipeline-card(@create="createPipelineAndRedirect")
</template>

<script lang="ts">
	import PipelineEndpoints, { EPipelineStatus, IPipeline, IPipelineDefinition } from "@/managers/api/pipelineEndpoints"
	import { Component } from "vue-property-decorator"
	import CreatePipelineCard from "@/components/pipelines/createPipelineCard.vue"
	import DataTableRow from "@/components/pipelines/dataTableRow.vue"
	import { Pipeline } from "@/managers/data/pipeline"
	import { Pipelines } from "@/managers/pipelines"
	import Vue from "vue"

	@Component({
		components: { DataTableRow,  CreatePipelineCard}
	})
	export default class PipelinesView extends Vue {

		private pipelines: Pipeline[] | null = null
		private definitions: IPipelineDefinition[] = []

		private loaded = false

		// Query settings
		private pageSize = 10
		private pageIndex = 1
		private totalCount: number | null = null
		private sortBy = ""
		private searchQuery = ""
		private queryTimeout: number | null = null

		private get items(): ITableItem[] {
			let items: ITableItem[] = []

			this.pipelines!.forEach(pipe => items.push(Object.create(pipe)))

			return items
		}

		private get headers(): ITableHeaders[] {
			let headers: ITableHeaders[] = []

			this.definitions.forEach(def => {
				if(def.key === "commentsComments")
					return

				headers.push({
					text: def.value,
					value: def.value,
					sortable: true
				})
			})

			return headers
		}

		public created(): void {
			(async () => {
				await this.loadDefinitions()
				await this.loadPipelines()
				this.loaded = true
			})()
		}

		private async loadDefinitions(): Promise<void> {
			this.definitions = await Pipelines.getDefinitions()
		}

		private sort(eventPayload: never): void {
			this.sortBy = eventPayload[0]
			this.loadPipelines()
		}

		private createPipelineAndRedirect(payload: IPipeline): void {
			PipelineEndpoints.create(
				payload.name,
				payload.contactPerson,
				payload.address,
				payload.country,
				payload.city,
				EPipelineStatus.notStarted
			).then(response => {
				this.$router.push({name: "Pipeline", params: {id: String(response.content.id)}})
			})
		}

		private search(eventPayload: never): void {
			if(this.queryTimeout)
				clearTimeout(this.queryTimeout)

			this.queryTimeout = setTimeout(() => {
				this.searchQuery = eventPayload
				this.loadPipelines()
			}, 500)
		}

		private loadPipelines(): Promise<void> {
			return Pipelines.search(
				this.pageSize,
				this.pageIndex,
				this.sortBy,
				this.searchQuery)
			.then(result => {
				this.pipelines = result.pipelines
				this.totalCount = result.totalCount
			})
		}
	}

	export interface ITableItem {
		[key: string]: string
	}

	export interface ITableHeaders {
		text: string;
		value: string;
		sortable: boolean;
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
