import { ipcMain } from 'electron'

let globalApp:Electron.App

ipcMain.on('utilMessage', (event, arg: string) => {
  if (!globalApp) {
    event.returnValue = undefined
    return
  }

  let returnValue

  // 按照arg配置对应的处理函数
  switch (arg) {
    case 'userData':
      returnValue = globalApp.getPath('userData')
      break
    default:
      break
  }

  event.returnValue = returnValue
})

const initMessage = function(app: Electron.App) {
  globalApp = app
}

export { initMessage }