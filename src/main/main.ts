import path from 'path'
import fixPath from 'fix-path'
import { menubar } from 'menubar'
import { initMessage } from './message'

const mb = menubar({
  index: 'file://' + path.join(__dirname, '../../static/index.html'),
  browserWindow: {
    width: 320,
    height: 520,
    webPreferences: {
      nodeIntegration: true,
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