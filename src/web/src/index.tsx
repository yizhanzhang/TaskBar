import ReactDOM from 'react-dom'
import Task from './components/task/index'
import Term from './components/term/index'
import './index.less'

ReactDOM.render(
	<div id="content">
		<Task />
		<Term />
	</div>,
	document.getElementById('main'),
)
