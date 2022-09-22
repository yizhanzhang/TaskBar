import { KeyboardEvent } from 'react'
import { emitter, exec } from '../../../util'

interface IProps {
	command: ICommand,
	del: Function,
	lineColor: string,
}

export default function (props: IProps) {
	const { command, del, lineColor } = props
	const refs: { [key: string]: HTMLInputElement } = {}

	const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>, command: ICommand) => {
		if (e.key === 'Enter') run(command)
	}

	const run = (command: ICommand) => {
		// get exec method
		let method = command.method
		if (command.args === true) {
			const value = refs[`input_${command.name}`].value
			method += ` ${value}`
		}

		// run and listen std
		emitter.emit('clear')
		const childP = exec(method)
		childP.stdout!.on('data', (data: string) => {
			emitter.emit('stdout', data)
		})
		childP.stderr!.on('data', (data: string) => {
			emitter.emit('stdout', data)
		})

		// reset
		refs[`input_${command.name}`].value = ''
	}

	return <div className="command" style={{ borderLeft: `5px solid ${lineColor}` }}>
		<div className="info">
			<div className="name">
				<span>{command.name}</span>
				{command.args && <input
					className="input"
					ref={(inst) => { refs[`input_${command.name}`] = inst as HTMLInputElement }}
					onKeyDown={(e) => { inputKeyDown(e, command) }}/>}
			</div>
			<div className="desc">{command.desc}</div>
		</div>
		<div className="operate">
			<button className="run" tabIndex={-1} onClick={() => { run(command) }}>运行</button>
			<button className="del" tabIndex={-1} onClick={() => { del(command) }}>删除</button>
		</div>
	</div>
}
