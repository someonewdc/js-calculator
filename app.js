const numbersBtns = document.querySelectorAll('.number');
const actionsBtns = document.querySelectorAll('.action');
const display = document.querySelector('.calculator-display');
const errorMessage = document.getElementById('error');
const point = document.getElementById('point');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear')

const state = {
	accumulator: [],
	nextNumber: [],
	action: ''
}

const render = (item = 'accumulator') => {
	console.log(state);
	
	errorMessage.classList.add('hide')
	display.textContent = state[item].join('') 
}

const numberHandler = number => {
	setActionBtnsAsEnabled()
	state.nextNumber.push(number)
	render('nextNumber')
}

const actionHandler = action => {
	if (state.action === '/' && +state.nextNumber.join('') === 0) {
		setActionBtnsAsDisabled()
		errorMessage.classList.remove('hide')
		state.accumulator = []
		state.nextNumber = []
		state.action = []
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

const clearHandler = () => {
	setActionBtnsAsDisabled()
	state.accumulator = []
	state.nextNumber = []
	state.action = []
	render()
	return
}
 
numbersBtns.forEach(numberBtn => numberBtn.addEventListener('click', () => numberHandler(numberBtn.textContent)))
actionsBtns.forEach(actionBtn => actionBtn.addEventListener('click', () => actionHandler(actionBtn.textContent)))
clear.addEventListener('click', clearHandler)