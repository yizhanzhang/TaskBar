import React, { KeyboardEvent } from 'react'
import { emitter, exec } from '~/util'

export default function (props) {
	const { command, del } = props
	const refs = {}

	const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>, command: ICommand) => {
		if (e.keyCode === 13) run(command)
	}

	const run = (command: ICommand) => {
		// get exec mrthod
		let method = command.method
		console.log(refs)
		if (command.args === true) {
			const value = refs[`input_${command.name}`].value
			method += ` ${value}`
		}

		// run and listen std
		const childP = exec(method)
		childP.stdout.on('data', (data: string) => {
			emitter.emit('stdout', data)
		})
		childP.stderr.on('data', (data: string) => {
			emitter.emit('stdout', data)
		})

		// reset
		refs[`input_${command.name}`].value = ''
	}

	return <div className="command" style={{ borderLeft: `5px solid ${props.lineColor}` }}>
		<div className="info">
			<div className="name">
				<span>{command.name}</span>
				{command.args && <input
					className="input"
					ref={(inst) => { refs[`input_${command.name}`] = inst }}
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
