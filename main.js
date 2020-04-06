const { nativeTheme } = require('electron')
const { menubar } = require('menubar')
const path = require('path')
require('fix-path')()

const isDev = process.env.NODE_ENV === 'development'

const mb = menubar({
  index: 'file://' + path.join(__dirname, './index.html'),
  browserWindow: {
    width: 320,
    height: 520,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
    transparent: true,
    frame: false,
    alwaysOnTop: isDev
  },
  preloadWindow: true,
  icon: path.join(__dirname, './static/', 'iconTemplate.png')
});

mb.on('after-create-window', () => {
})