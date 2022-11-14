<template lang="pug">
	tr
		td(v-for="header in headers" :key="header.value" @click="goToPipeline")
			.div
				p(v-if="header.text !== 'status'").pa-0.ma-0 {{item[header.value]}}
				p(v-else :class="decideColour(item[header.value])").pa-0.ma-0 {{item[header.value]}}
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator"
	import { ITableHeaders, ITableItem } from "@/views/PipelinesView.vue"
	import Vue from "vue"

	@Component({})
	export default class dataTableRow extends Vue {
		@Prop({required: true})
		private headers!: ITableHeaders[]

		@Prop({required: true})
		private item!: ITableItem

		private goToPipeline(): void {
			this.$router.push({name: "Pipeline", params: {id: this.item["id"]}})
		}

		private decideColour(status: string): string {
			switch (status) {
				case "not started" : return "red--text"
				case "in progress" : return "orange--text"
				case "done" : return "green--text"
				default: return ""
			}
		}
	}
</script>

<style scoped lang="sass">
.link
	text-decoration: none
	color: black
</style>
