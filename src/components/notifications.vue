<template lang="pug">
	v-snackbar(v-model="hasError" timeout="-1" ) {{ currentErrorMessage }}
		template(v-slot:action="{attrs}")
			v-btn(v-bind="attrs" @click="dismissError") Close
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator"
	import NotificationsManager from "@/managers/data/notifications"
	import Vue from "vue"

	@Component({})
	export default class Notifications extends Vue {

		private get hasError(): boolean {
			return NotificationsManager.hasError()
		}

		private set hasError(value: boolean) {
			return
		}

		private get currentErrorMessage(): string {
			return NotificationsManager.currentError ? NotificationsManager.currentError.name : ""
		}

		private dismissError(): void {
			NotificationsManager.popError()
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
