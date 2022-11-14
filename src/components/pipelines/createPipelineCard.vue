<template lang="pug">
	v-card(elevation="4" ).ma-4
		v-card-title new pipeline
		v-card-subtitle create pipeline
		v-card-text.d-flex.flex-row.flex-md-row.flex-sm-column
			v-text-field(label="name" v-model="name").ma-2
			v-text-field(label="contact person" v-model="contactPerson").ma-2
			v-text-field(label="address" v-model="address").ma-2
			v-text-field(label="city" v-model="city").ma-2
			v-text-field(label="country" v-model="country" ).ma-2
			v-btn(@click="createPipeline").ma-2.primary.white--text create
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator"
	import Vue from "vue"

	@Component({})
	export default class createPipelineCard extends Vue {
		private name = ""
		private contactPerson = ""
		private country = ""
		private city = ""
		private address = ""

		private createPipeline(): void {
			this.$emit("create",
				{
					name: this.name,
					contactPerson: this.contactPerson,
					country: this.country,
					city: this.city,
					address: this.address
				})
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
