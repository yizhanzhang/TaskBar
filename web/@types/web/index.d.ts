declare function require(name:string);

interface ICommand {
	name: string,
	desc: string,
	args: boolean,
	method: string
}