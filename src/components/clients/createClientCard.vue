<template lang="pug">
	v-card(elevation="4" ).ma-4
		v-card-title Client
		v-card-subtitle create client
		v-card-text.d-flex.flex-row.flex-md-row.flex-sm-column
			v-text-field(label="name" v-model="name").ma-2
			v-text-field(label="title" v-model="title").ma-2
			v-text-field(label="activeLines" v-model="activeLines").ma-2
			v-text-field(label="phone" v-model="phone").ma-2
			v-text-field(label="email" v-model="email" ).ma-2
			v-text-field(label="status" v-model="status" ).ma-2
			v-btn(@click="createClient").ma-2.primary.white--text create
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator"
	import Vue from "vue"

	@Component({})
	export default class CreateClientCard extends Vue {
		private title = ""
		private name = ""
		private from = new Date()
		private to  = new Date()
		private activeLines = 0
		private phone = ""
		private email = ""
		private status = ""

		private createClient(): void {
			this.$emit("create",
				{
					name: this.name,
					title: this.title,
					from: this.from,
					to: this.to,
					activeLines: this.activeLines,
					phone: this.phone,
					email: this.email,
					status: this.status ?? "just created"
				})
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
