import childProcess from 'child_process';

import chalk from 'chalk';

console.log(chalk.blue('begin to pack [task-bar.app]'))
childProcess.execSync('electron-builder --dir', { stdio: 'inherit' })