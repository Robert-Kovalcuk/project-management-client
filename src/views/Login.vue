<template lang="pug">
	v-card(max-width="300" elevation="4" ).mx-auto
		v-card-title.justify-center Login
		v-card-text
			v-text-field(v-model="email" label="email")
			v-text-field(
				v-model="password"
				label="password"
				:type="showPassword ? 'text' : 'password' "
				:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
				@click:append="showPassword = !showPassword"
				)
		v-card-actions.justify-space-around
			v-btn(@click="login").primary.white--text login
			v-btn(@click="goToRegister").blue.white--text register
</template>

<script lang="ts">
	import Authentication from "@/managers/authentication/authentication"
	import {Component} from "vue-property-decorator"
	import Vue from "vue"

	@Component
	export default class User extends Vue {
		private email = ""
		private password = ""
		private showPassword = false

		private login(): void {
			Authentication.login(this.email, this.password)
		}

		private goToRegister(): void {
			this.$router.push("/register")
		}

	}
</script>

<style scoped lang="sass">

</style>
