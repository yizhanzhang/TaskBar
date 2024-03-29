import path from 'path'
import fixPath from 'fix-path'
import { menubar } from 'menubar'
import { initMessage } from './message'

const mb = menubar({
  index: 'file://' + path.join(__dirname, '../web/index.html'),
  browserWindow: {
    width: 320,
    height: 520,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
    transparent: true,
    frame: false,
    alwaysOnTop: false
  },
  preloadWindow: true,
  icon: path.join(__dirname, '../../static/', 'iconTemplate.png')
});

mb.on('after-create-window', () => {
  mb.app.dock.hide()
})

fixPath()
initMessage(mb.app);
