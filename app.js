const numbers = document.querySelectorAll('.number');
const actions = document.querySelectorAll('.action');
const display = document.querySelector('.calculator-display');
const errorMessage = document.getElementById('error');
const point = document.getElementById('point');

const equal = document.getElementById('equal');

const mainContainer = [];
const auxiliaryContainer = [];
const actionsContainer = [];
let counter = 0;

numbers.forEach(i => i.addEventListener('click', numberToDisplay));
point.addEventListener('click', pointToDisplay);
actions.forEach(action => action.addEventListener('click', doAction));

function pointToDisplay(e) {
	auxiliaryContainer.push(e.target.textContent);
	display.textContent += '.';
}

function numberToDisplay() {
	if (!errorMessage.classList.contains('hide')) errorMessage.classList.add('hide');

	actions.forEach(i => i.disabled = false);
	point.disabled = false;

	const number = event.target.textContent;
	auxiliaryContainer.push(number);
	display.textContent = parseFloat(auxiliaryContainer.join(''));
}

function doAction(e) {
	display.textContent = '';
	actionsContainer.push(e.target.textContent);
	mainContainer.push(+auxiliaryContainer.join(''));
	auxiliaryContainer.splice(0, auxiliaryContainer.length);
	if (mainContainer.length === 2) {
		chooseAction();
		mainContainer.splice(-1);
	}
	counter++;
	display.textContent = mainContainer[0];
}

function chooseAction() {
	switch (actionsContainer[counter - 1]) {
		case '+':
			mainContainer[0] += mainContainer[1];
			break;
		case '-':
			mainContainer[0] -= mainContainer[1];
			break;
		case '*':
			mainContainer[0] *= mainContainer[1];
			break;
		case '/':
			if (mainContainer[1] === 0) {
				errorMessage.classList.remove('hide');
				mainContainer.splice(0, mainContainer.length);
			}
			mainContainer[0] /= mainContainer[1];
			break;
		case '=':
			display.textContent = mainContainer[0];
		default:
			break;
	}
}