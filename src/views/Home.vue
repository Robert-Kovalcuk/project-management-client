<template lang="pug">
	div hello
		v-btn(@click="logout") logout
</template>

<script lang="ts">
	import Authentication from "@/managers/authentication/authentication"
	import { Component } from "vue-property-decorator"
	import Vue from "vue"

	@Component({})
	export default class Home extends Vue {
		private logout(): void {
			Authentication.logout()
		}
	}
</script>
