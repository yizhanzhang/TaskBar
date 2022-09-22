export {};

declare global {
	interface ICommand {
		name: string,
		desc: string,
		args: boolean,
		method: string
	}
}