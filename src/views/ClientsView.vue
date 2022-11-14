<template lang="pug">
	.clients(v-if="isLoaded").d-flex.flex-column.justify-center
		.div.d-flex.flex-row.justify-center.flex-wrap
			v-card(v-for="client in clients" width="250" elevation="4").ma-5
				v-card-title.primary.white--text.justify-center {{ client.name.toUpperCase() }}
				v-card-text
					.div(v-for="definition in definitions_primitive_attributes").d-flex.flex-row.ma-2
						span.text-body-1 {{ definition.value }}:
						v-spacer
						p(style="letter-spacing: 2px").pa-0.ma-0 {{ client[definition.key] }}
		create-client-card(@create="createAndRedirect")
</template>

<script lang="ts">
	import { Client } from "@/managers/data/client"
	import { Clients } from "@/managers/clients"
	import { Component } from "vue-property-decorator"
	import CreateClientCard from "@/components/clients/createClientCard.vue"
	import { IClientDefinition } from "@/managers/api/clientEndpoints"
	import Vue from "vue"

	@Component({
		components: { CreateClientCard }
	})
	export default class ClientsView extends Vue {
		private clients: Client[] | null = null
		private definitions: IClientDefinition[] | null = null
		private isLoaded = false

		private get definitions_primitive_attributes(): IClientDefinition[] {
			return this.definitions!.filter(
				def =>
					def.key !== "noteNote" &&
					def.key !== "commentsComments" &&
					def.key !== "from" &&
					def.key !== "to"
			)
		}

		public created(): void {
			(async () => {
				await this.loadDefinitions()
				await this.loadClients()
			})()
		}

		private loadClients(): Promise<void> {
			return Clients.get().then(clients => {
				this.clients = clients
				this.isLoaded = true
			})
		}

		private loadDefinitions(): Promise<void> {
			return Clients.getDefinitions().then(definitions => {
				this.definitions = definitions
			})
		}

		private createAndRedirect(payload: Client): void {
			Clients.create(
				payload.title,
				payload.name,
				payload.from,
				payload.to,
				payload.activeLines,
				payload.phone,
				payload.email,
				payload.status
			).then(() => {
				this.loadClients()
			})
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
