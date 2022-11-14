export function padNumber(value: number): string {
	return value.toString(10).padStart(2, "0")
}
