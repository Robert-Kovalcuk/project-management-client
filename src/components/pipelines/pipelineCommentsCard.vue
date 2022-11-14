<template lang="pug">
	.comments
		v-card.darken-4.white--text
			v-card-title() COMMENTS
			v-card-text.flex-column
				.com(v-if="hasComments" v-for="comment in usersAndComments")
					strong() {{ comment.user }}
					p {{comment.comment}}
				strong(v-else) Be first to add a comment
				v-textarea(v-model="comment" placeholder="add comment..." clearable outlined)
			v-card-actions
				v-btn(@click="addComment") Add comment
</template>

<script lang="ts">
	import { Component, PropSync } from "vue-property-decorator"
	import Vue from "vue"

	@Component({})
	export default class pipelineCommentsCard extends Vue {
		@PropSync("comments",{required: true})
		private innerComments!: string []

		private comment = ""

		private get hasComments(): boolean {
			return !!this.innerComments.length
		}

		private get usersAndComments(): {user: string, comment: string}[] {
			let usersAndComments: {user: string, comment: string}[] = []

			this.innerComments.forEach(comment => {
				let userAndComment = comment.split(new RegExp(": "))
				usersAndComments.push({
					user: userAndComment[0],
					comment: userAndComment[1]
				})
			})

			return usersAndComments
		}

		private addComment(): void {
			this.removeCommas()
			this.$emit("comment", this.comment)
			this.comment = ""
		}

		private removeCommas(): void {
			this.comment = this.comment.replace(",", " ")
		}
	}
</script>

<style scoped>

</style>

<style scoped>

</style>
