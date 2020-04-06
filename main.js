const { menubar } = require('menubar')
const path = require('path')
const message = require('./message')
require('fix-path')()

const isDev = process.env.NODE_ENV === 'development'

const mb = menubar({
  index: 'file://' + path.join(__dirname, './web/index.html'),
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

message.init(mb.app)