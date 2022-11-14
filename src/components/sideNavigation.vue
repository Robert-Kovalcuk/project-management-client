<template lang="pug">
	v-navigation-drawer(app :expand-on-hover="isSmall" permanent width="150" dark).justify-center.primary
		template(v-slot:default )
			v-icon(large v-if="isSmall").ml-2 mdi-menu
			v-list
				v-list-item(v-for="route in accessibleRoutes" link)
					v-list-item-content(@click="goToRoute(route.name)")
						v-list-item-title {{ route.name }}
		template(v-slot:append)
			v-icon(@click="logout").ml-4 mdi-logout
</template>

<script lang="ts">
	import Authentication from "@/managers/authentication/authentication"
	import { Component } from "vue-property-decorator"
	import { RouteRecordPublic } from "vue-router"
	import Vue from "vue"

	@Component({})
	export default class sideNavigation extends Vue {
		private isSmall = window.innerWidth < 1000
		private hideContent = this.isSmall

		private get accessibleRoutes(): RouteRecordPublic[] {
			return this.$router.getRoutes().filter(route => !route.meta.requiresGuest && route.name !== "Pipeline")
		}

		public created(): void {
			if(typeof window === "undefined")
				return

			window.addEventListener("resize", () => {
				this.isSmall = window.outerWidth < 1000
			}, {passive: true})
		}

		public logout(): void {
			Authentication.logout()
		}

		public goToRoute(name: string): void {
			this.$router.push({name})
		}
	}
</script>

<style scoped lang="sass">

</style>
