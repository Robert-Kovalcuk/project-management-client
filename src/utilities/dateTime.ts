import {padNumber} from "@/utilities/number"

export function toPrettyDate(value: Date): string {
	return `${value.getFullYear()}/${padNumber(value.getMonth() + 1)}/${padNumber(value.getDate())} ${padNumber(value.getHours())}:${padNumber(value.getMinutes())}:${padNumber(value.getSeconds())}`
}
