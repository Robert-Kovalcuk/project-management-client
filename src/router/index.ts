import VueRouter, { RouteConfig } from "vue-router"
import Home from "../views/Home.vue"
import routesGuard from "@/router/routesGuard"
import Vue from "vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			requiresAuthenticated: true
		}
	},
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
		meta: {
			requiresGuest: true
		}
	},
	{
		path: "/register",
		name: "Register",
		component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
		meta: {
			requiresGuest: true
		}
	},
	{
		path: "/pipelines",
		name: "Pipelines",
		component: () => import(/* webpackChunkName: "pipelines" */ "../views/PipelinesView.vue"),
		meta: {
			requiresAuthenticated: true
		}
	},
	{
		path: "/pipelines/:id",
		name: "Pipeline",
		component: () => import(/* webpackChunkName: "pipelines" */ "../views/Pipeline.vue"),
		props: true,
		meta: {
			requiresAuthenticated: true
		}
	},
	{
		path: "/projects",
		name: "Project",
		component: () => import(/* webpackChunkName: "projects" */ "../views/ProjectsView.vue"),
		props: true,
		meta: {
			requiresAuthenticated: true
		}
	},
	{
		path: "/clients",
		name: "Clients",
		component: () => import(/* webpackChunkName: "clients" */ "../views/ClientsView.vue"),
		props: true,
		meta: {
			requiresAuthenticated: true
		}
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

routesGuard(router)

export default router
