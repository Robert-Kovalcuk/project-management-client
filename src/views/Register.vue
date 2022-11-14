<template lang="pug">
	v-card(max-width="300"  elevation="4" ).mx-auto
		v-card-title.justify-center Register
		v-card-text(v-if="!registering" ).d-flex.flex-column.justify-center
			v-text-field(v-model="email" label="email" )
			v-text-field(v-model="password" label="password")
		v-card-text(v-if="registering").justify-center.d-flex
			v-progress-circular(indeterminate).primary--text
		v-card-actions.d-flex.flex-column
			v-btn(@click="register").primary.white--text register
			v-card-subtitle
				small already have account?
				v-btn(x-small text @click="goToLogin").blue--text login
</template>

<script lang="ts">
	import {Component} from "vue-property-decorator"
	import UserEndpoints from "@/managers/api/userEndpoints"
	import Vue from "vue"

	@Component({})
	export default class Register extends Vue {
		private email = ""
		private password = ""
		private registering = false

		private register(): void {
			if(!this.email || !this.password)
				return
			else {
				this.registering = true
				UserEndpoints.create(this.email, this.password).then(() => {
					this.registering = false
					this.goToLogin()
				})
			}
		}

		private goToLogin(): void {
			this.$router.push("Login")
		}
	}
</script>

<style scoped lang="sass">
	.letterSpacing
		letter-spacing: 1px
</style>
