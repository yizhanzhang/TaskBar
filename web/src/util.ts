// import EventEmitter from 'event-emitter';
const ipc = require('electron').ipcRenderer
const { EventEmitter } = require('events')
const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

const emitter = new EventEmitter()

const exec = (method: string) => {
	return childProcess.exec(method)
}

const userData = new class UserData {
	private _defaultData = [
		{ name: 'open', desc: 'open folder', args: true, method: 'mysh open' },
		{ name: 'code', desc: 'open vscode project', args: true, method: 'mysh code' },
		{ name: 'syncGameIDE', desc: '统一切换git分支', args: true, method: 'mysh syncGameIDE' },
	]
	private userPath = ipc.sendSync('utilMessage', 'userData')
	private userFilePath = path.join(this.userPath, './userData.json')
	private _data = this.initData()

	initData() {
		if (fs.existsSync(this.userFilePath)) {
			const data = fs.readFileSync(this.userFilePath, 'utf-8')
			return JSON.parse(data)
		}
		fs.writeFileSync(this.userFilePath, JSON.stringify(this._defaultData))
		return this._defaultData
	}

	getData = () => {
		return this._data
	}

	writeData = (value: Array<ICommand>) => {
		console.log(this)
		fs.writeFileSync(this.userFilePath, JSON.stringify(value))
	}
}()

export {
	emitter,
	exec,
	userData
}
