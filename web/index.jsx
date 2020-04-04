import React from 'react'
import ReactDOM from 'react-dom'
import Task from './components/task'
import Term from './components/term'
import './index.less'

ReactDOM.render(
  <div id="content">
    <div id="cornor" />
    <Task />
    <Term />
  </div>,
  document.getElementById('main'),
)