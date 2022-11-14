import Vue from "vue"

const watcher = new Vue()

export function $watch<T>(target: () => T, callback: (value: T) => void, immediate = false): () => void {
	return watcher.$watch(target, callback, {immediate})
}

export async function $onceTrue(target: () => boolean): Promise<void> {
	if (target())
		return

	return new Promise(resolve => {
		const unwatch = $watch(
			target,
			value => {
				if (value) {
					unwatch()
					resolve()
				}
			},
			false
		)
	})
}

export async function $onceNotNull<T>(target: () => (T | null)): Promise<T> {
	const immediate = target()

	if (immediate !== null)
		return immediate!
	else {
		return new Promise(resolve => {
			const unwatch = $watch(
				target,
				value => {
					if (value !== null) {
						unwatch()
						resolve(value)
					}
				},
				false
			)
		})
	}
}
