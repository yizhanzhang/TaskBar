const ipc = require('electron').ipcMain

let globalApp = undefined

ipc.on('utilMessage', function (event, arg) {
  if (!globalApp) {
    event.returnValue = undefined
    return
  }

  let result
  if (arg === 'userData') {
    result = globalApp.getPath('userData')
  }
  event.returnValue = result
})

const init = function(app) {
  globalApp = app
}

module.exports = { init }