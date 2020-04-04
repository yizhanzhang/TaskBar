import React from 'react'
import { emitter } from '~/util.js'

export default class Term extends React.Component {
  constructor() {
    super()
    this.state = {
      logs: [],
      open: false
    }
  }

  componentDidMount() {
    emitter.on('stdout', data => {
      const logs = this.state.logs
      logs.push(data.replace('\n', '\r\n'))
      this.setState({
        logs,
      })
    })
  }

  render() {
    return <div id="term">
      {this.state.open && <div className="whole" onDoubleClick={() => { this.setState({ open: false })}}>
        {this.state.logs.map((log, index) => <div className="info" key={index}>{log}</div>)}
      </div>}
      {!this.state.open && <div className="simple" onDoubleClick={() => { this.setState({ open: true })}}>
        {this.state.logs[this.state.logs.length - 1]}
      </div>}
    </div>
  }
}