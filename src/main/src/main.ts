import path from 'path'
import fixPath from 'fix-path'
import { menubar } from 'menubar'
import { initMessage } from './message'

const mb = menubar({
  index: 'file://' + path.join(__dirname, '../web/index.html'),
  browserWindow: {
    width: 300,
    height: 370,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
    transparent: true,
    frame: false,
    alwaysOnTop: process.env.NODE_ENV === 'development'
  },
  preloadWindow: true,
  icon: path.join(__dirname, '../../static/', 'iconTemplate.png')
});

fixPath()
initMessage(mb.app)