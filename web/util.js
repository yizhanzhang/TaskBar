// import EventEmitter from 'event-emitter';
const ipc = require('electron').ipcRenderer
const { EventEmitter } = require('events')
const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const emitter = new EventEmitter();

const exec = (method) => {
  return child_process.exec(method)
}

const userData = new class UserData {
  constructor() {
    this._defaultData = [
      { "name": "open", "desc": "open folder", "args": true, "method": "mysh open" },
      { "name": "code", "desc": "open vscode project", "args": true, "method": "mysh code" },
      { "name": "syncGameIDE", "desc": "统一切换git分支", "args": true, "method": "mysh syncGameIDE" }
    ]
    this._data = []
    this.initData()
  }

  initData() {
    this.userPath = ipc.sendSync('utilMessage', 'userData')
    this.userFile = path.join(this.userPath, './userData.json')
    if (fs.existsSync(this.userFile)) {
      const data = fs.readFileSync(this.userFile, 'utf-8')
      this._data = JSON.parse(data)
    } else {
      fs.writeFileSync(this.userFile, JSON.stringify(this._defaultData))
      this._data = this._defaultData
    }
  }

  getData() {
    return this._data
  }

  writeData(value) {
    fs.writeFileSync(this.userFile, JSON.stringify(value))
  }
}()

export {
  emitter,
  exec,
  userData
}
