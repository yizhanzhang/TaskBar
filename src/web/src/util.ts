import fs from 'fs'
import path from 'path'
import childProcess from 'child_process'
import { EventEmitter } from 'events'
import { ipcRenderer } from 'electron'

const emitter = new EventEmitter()

const exec = (method: string) => {
	return childProcess.exec(method)
}

class UserData {
	private static initialData = [
		{ name: 'open', desc: 'open folder', args: true, method: 'mysh open' },
	]
	private userPath = ipcRenderer.sendSync('utilMessage', 'userData')
	private userFilePath = path.join(this.userPath, './userData.json')
	private data = this.initData()

	initData() {
		if (!fs.existsSync(this.userFilePath)) {
			fs.writeFileSync(this.userFilePath, JSON.stringify(UserData.initialData))
		}
		const data = fs.readFileSync(this.userFilePath, 'utf-8')
		return JSON.parse(data)
	}

	getData = () => {
		return this.data
	}

	writeData = (value: Array<ICommand>) => {
		fs.writeFileSync(this.userFilePath, JSON.stringify(value))
	}
}

const userData  = new UserData()

export {
	exec,
	emitter,
	userData
}
