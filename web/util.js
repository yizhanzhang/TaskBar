// import EventEmitter from 'event-emitter';
const { EventEmitter } = require('events')
const child_process = require('child_process')

const emitter = new EventEmitter();

const exec = (method) => {
  return child_process.exec(method)
}

export {
  emitter,
  exec
}
