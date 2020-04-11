const childProcess = require('child_process')

const chalk = require('chalk')
const dateFormat = require('dateformat');

console.log(chalk.blue(`${dateFormat(Date.now(), "HH:MM:ss")} begin to pack [task-bar.app]`))
childProcess.execSync('electron-builder --dir', { stdio: 'inherit' })