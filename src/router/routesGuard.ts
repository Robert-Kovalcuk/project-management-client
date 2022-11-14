import Router, { RawLocation, Route } from "vue-router"
import { $watch } from "@/utilities/watcher"
import Authentication from "@/managers/authentication/authentication"

export default function (router: Router): void {
	router.beforeEach((to, from, next) => {
		checkRouteAuthentication(to)
			.then(location => {
				next(location ?? undefined)
			})
			.catch(() => {
				next()
			})
	})

	$watch(() => Authentication.isAuthenticated, () => {
		checkRouteAuthentication(router.currentRoute)
			.then(location => {
				if(location !== null)
					return router.push(location)
			})
			.catch(reason => {
				if (!Router.isNavigationFailure(reason, Router.NavigationFailureType.redirected))
					throw reason
			})
	})
}

async function checkRouteAuthentication(route: Route): Promise<RawLocation | null> {
	const requiresAuthenticated = route.matched.some(record => record.meta.requiresAuthenticated)
	const requiresGuest = route.matched.some(record => record.meta.requiresGuest)

	const isAuthenticated = await Authentication.checkLoginStatus()

	if (!requiresAuthenticated && !requiresGuest)
		return null

	if (requiresGuest && isAuthenticated) {
		if (route.query.redirect !== undefined)
			return route.query.redirect as string

		return { path: "/" }
	} else if (requiresAuthenticated && !isAuthenticated) {
		return {
			name: "Login",
			query: {
				redirect: route.fullPath
			}
		}
	} else
		return null
}
