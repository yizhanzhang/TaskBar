const fs = require('fs');
const path = require('path');
const childProcess = require('child_process')

const chalk = require('chalk')
const dateFormat = require('dateformat');
const archiver = require('archiver');

console.log(chalk.blue(`${dateFormat(Date.now(), "HH:MM:ss")} begin to pack [task-bar.app]`))
childProcess.execSync('electron-builder --dir', { stdio: 'inherit' })

console.log(chalk.blue(`${dateFormat(Date.now(), "HH:MM:ss")} begin to archive [task-bar.zip]`))
const archive = archiver('zip', { zlib: { level: 9 } });
const stream = fs.createWriteStream(path.resolve(__dirname, '../dist/mac/task-bar.zip'));
return new Promise((resolve, reject) => {
	archive
		.glob(path.resolve(__dirname, '../dist/mac/task-bar.app'))
		.on('error', err => reject(err))
		.pipe(stream);

	stream.on('close', () => {
		console.log(chalk.blue(`${dateFormat(Date.now(), "HH:MM:ss")} archive [task-bar.zip] success`))
		resolve()
	});
	archive.finalize();
});