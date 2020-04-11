import React from 'react'
import Command from './components/command'
import Form from './components/form'
import { userData } from '~/util'

const getLineColors = (index: number) => {
	const colors = ['#38beb5', '#fdb42b', '#ee3884', '#1c52c7', '#74b72d']
	return colors[index % colors.length]
}

export default class Task extends React.Component {
	state = {
		tasks: userData.getData() as Array<ICommand>,
	}

	add = (command: ICommand) => {
		this.state.tasks.push(command)
		userData.writeData(this.state.tasks)
		this.setState({ tasks: this.state.tasks })
	}

	del = (command: ICommand) => {
		const newTasks = this.state.tasks.filter(item => item !== command)
		userData.writeData(newTasks)
		this.setState({ tasks: newTasks })
	}

	render() {
		return <div id="task">
			{this.state.tasks.map((command, index) =>
				<Command
					key={`${command.name}_${index}`}
					lineColor={getLineColors(index)}
					command={command}
					del={this.del} />,
				)}
			<Form add={this.add} />
		</div>
	}
}
