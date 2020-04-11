import React from 'react'
import { emitter } from '~/util'

export default class Term extends React.Component {
	state = {
		open: false,
		logs: [] as Array<string>,
	}

	toggleShow = () => {
		this.setState({ open: !this.state.open })
	}

	componentDidMount() {
		emitter.on('stdout', (data: string) => {
			const formatedData = data.replace('\n', '\r\n')
			this.state.logs.unshift(formatedData)
			const newLogs = this.state.logs.slice(0, 100)
			this.setState({ logs: newLogs })
		})
	}

	render() {
		const { open, logs } = this.state
		return <div id="term">
			{open && <div className="whole" onDoubleClick={this.toggleShow}>
				{logs.map((log, index) => <div className="info" key={index}>{log}</div>)}
			</div>}
			{!open && <div className="simple" onDoubleClick={this.toggleShow}>
				{logs[0]}
			</div>}
		</div>
	}
}
