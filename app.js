const numbersBtns = document.querySelectorAll('.number');
const actionsBtns = document.querySelectorAll('.action');
const display = document.querySelector('.calculator-display');
const errorMessage = document.getElementById('error');
const clearAll = document.getElementById('clear-all')
const clearCurrent = document.getElementById('clear-current')

const state = {
	accumulator: [],
	nextNumber: [],
	action: ''
}

const render = (item = 'accumulator') => {
	errorMessage.classList.add('hide')
	if (state[item].join('').length > 19 ) {
		display.textContent = 'Number is too large'
		state.nextNumber = []
		state.accumulator = []
	} else display.textContent = state[item].join('') 
	
}

const numberHandler = number => {
	setActionBtnsAsEnabled()
	state.nextNumber.push(number)
	render('nextNumber')
}

const actionHandler = action => {
	if (state.action === '/' && state.nextNumber.join('') === '0') {
		setActionBtnsAsDisabled()
		errorMessage.classList.remove('hide')
		state.accumulator = []
		state.nextNumber = []
		state.action = []
		render()
		return
	}
	if (action === '=' && state.nextNumber.length === 0) return
	if (action === '=') {
		state.accumulator.push(+state.nextNumber.join(''))
		doAction(state.action)
		render()
		state.nextNumber = []
		state.nextNumber = [...state.accumulator]
		state.accumulator = []
		state.action = '='
		return
	}
	if (action === '-' && state.nextNumber[state.nextNumber.length - 1] === '-') return
	if (action === '-' && state.nextNumber.length === 0) {
		state.nextNumber.push('-')
		render('nextNumber')
		return
	}
	if (action === '.' && state.nextNumber[state.nextNumber.length - 1] === '.') return
	if (action === '.') {		
		state.nextNumber.push('.')
		render('nextNumber')
		return
	}
	if (!state.action) {
		state.accumulator.push(+state.nextNumber.join(''))
	}
	else {
		state.accumulator.push(+state.nextNumber.join(''))
		doAction(state.action)
	}
	state.nextNumber = []
	state.action = action
	render()
}

const doAction = action => {
	switch (action) {
		case '+':
			return state.accumulator = [state.accumulator.reduce((accum, nextNumber) => accum + nextNumber)]
		case '-':
			return state.accumulator = [state.accumulator.reduce((accum, nextNumber) => accum - nextNumber)]
		case '*':
			return state.accumulator = [state.accumulator.reduce((accum, nextNumber) => accum * nextNumber)]
		case '/':
			return state.accumulator = [state.accumulator.reduce((accum, nextNumber) => accum / nextNumber)]
		default:
			return
	}
}

const setActionBtnsAsEnabled = () => {
	document.querySelectorAll('.disableable').forEach(btn => btn.disabled = false)
}

const setActionBtnsAsDisabled = () => {
	document.querySelectorAll('.disableable').forEach(btn => btn.disabled = true)
}

const clearAllHandler = () => {
	setActionBtnsAsDisabled()
	state.accumulator = []
	state.nextNumber = []
	state.action = []
	render()
}

const clearCurrentHandler = () => {
	if (typeof state.nextNumber[0] === 'number') {
		state.nextNumber = [state.nextNumber[0].toString().slice(0, -1)]
		render('nextNumber')
	} else if (state.nextNumber.length > 1) {
		state.nextNumber.pop()
		render('nextNumber')
	} else {
		state.nextNumber = [state.nextNumber[0].slice(0, -1)]
		render('nextNumber')
	}
	
}
 
numbersBtns.forEach(numberBtn => numberBtn.addEventListener('click', () => numberHandler(numberBtn.textContent)))
actionsBtns.forEach(actionBtn => actionBtn.addEventListener('click', () => actionHandler(actionBtn.textContent)))
clearAll.addEventListener('click', clearAllHandler)
clearCurrent.addEventListener('click', clearCurrentHandler)