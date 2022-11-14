<template lang="pug">
	v-app
		side-navigation(v-if="displayNavigator" )
		v-main.app
			Notifications
			router-view
</template>

<script lang="ts">
	import { $watch } from "@/utilities/watcher"
	import {Component} from "vue-property-decorator"
	import Notifications from "@/components/notifications.vue"
	import SideNavigation from "@/components/sideNavigation.vue"
	import Vue from "vue"

	@Component({components: {
			SideNavigation,
			Notifications}})
	export default class App extends Vue {
		private displayNavigator = false

		public created(): void {
			$watch(() => this.$route, value => {
				this.displayNavigator = value.meta!.hasOwnProperty("requiresAuthenticated")
			})
		}
	}
</script>

<style scoped lang="sass">
	.app
		max-width: 1600px
		width: 100%
		margin: 1em auto
		overflow-x: hidden
</style>
