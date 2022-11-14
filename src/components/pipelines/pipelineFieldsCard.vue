<template lang="pug">
	.pipeline
		v-card
			v-card-title.d-flex.justify-center {{pipeline.name}}
			v-card-text.d-flex.justify-center.flex-column
				v-text-field(:placeholder="pipeline.id.toString()" :disabled="!isEditing" v-model="pipeline.id")
				v-text-field(:placeholder="pipeline.contactPerson" :disabled="!isEditing" v-model="pipeline.contactPerson")
				v-text-field(:placeholder="pipeline.status"        :disabled="!isEditing" v-model="pipeline.status")
				v-text-field(:placeholder="pipeline.country"       :disabled="!isEditing" v-model="pipeline.country")
				v-text-field(:placeholder="pipeline.city"          :disabled="!isEditing" v-model="pipeline.city")
				v-text-field(:placeholder="pipeline.address"       :disabled="!isEditing" v-model="pipeline.address")
			v-card-actions
				.div(v-if="isEditing").d-flex.justify-lg-space-between
					v-btn(@click="save").green.white--text  save
					v-btn(@click="cancel").red.white--text  cancel
				v-btn(v-else @click="edit").green.white--text edit
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator"
	import { Pipeline } from "@/managers/data/pipeline"
	import Vue from "vue"

	@Component({})
	export default class pipeline extends Vue {
		@Prop({required: true})
		private pipeline!: Pipeline

		private isEditing = false

		private edit(): void {
			this.isEditing = true
		}

		private save(): void {
			this.$emit("save", pipeline)
			this.isEditing = false
		}

		private cancel(): void {
			this.$emit("cancel")
			this.isEditing = false
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
