let debug = true;
let currentNumber = '', lastNumber = '', operant = '';
window.addEventListener('keydown', handleKeyboardInput)

// handeling number inputs
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumber(button.textContent);
    });
});

// select all input buttons for operators
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.textContent, button.id, button);
    });
});

const modeButtons = document.querySelectorAll('.mode');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleModeButtons(button.id);
    });
});

function handleNumber (input) {
    // reset on number before operator after last calculation
    if (operant == '=') clear();

    // add number to string
    if (currentNumber == '' && input == '.') {
        currentNumber = '0.';
    } else {
        currentNumber += input;
    }
    displayOnScreen('number', currentNumber);
    if (debug) console.log(`${lastNumber} . ${operant} . ${currentNumber}`);
}

function handleOperator (input, id, button) {
    // emphasises the selected operant 
    operatorButtons.forEach( operantButton => operantButton.classList.remove("selected"))
    if (operant != '=' && button) button.classList.add("selected");

    // before a second operator can be added to the calculation the last one mus be calculated
    if (operant && currentNumber) { 
        if (debug) console.log("calculate")
        if (currentNumber == '') currentNumber = lastNumber;
        calculate(+lastNumber, +currentNumber, operant);     
        operant = input;   
    // when useing the quare root it doesn't requiere a second value
    } else if (id == 'squareRoot') {
        operant = '√';
        displayOnScreen('displayTop', operant);
        calculate(+lastNumber, +currentNumber, operant);
    } else {
        // make space for the second number
        if (lastNumber == '') {
            lastNumber = currentNumber;  
            currentNumber = '';
        } 
        // store the oprator
        operant = input;   
        displayOnScreen('displayTop', `${lastNumber} ${operant}`)
    }   
    if (operant != '=') displayOnScreen('displayTop', `${lastNumber} ${operant}`)
    if (debug) console.log(`${lastNumber} . ${operant} . ${currentNumber}`);
}

function handleModeButtons (input) {
    switch (input) {
        case 'buttonClear':
            clear();
            break;
        case 'backspace':
            currentNumber = currentNumber.slice(0, -1);
            displayOnScreen('number', currentNumber);
            break;
    }
}

const negativPositiv = document.querySelector('#negativPositiv');
negativPositiv.addEventListener('click', () => {
    // makes a positiv a number negativ and other way around 
    currentNumber *= -1;
    displayOnScreen('number', currentNumber);
});

function clear () {
    currentNumber = '', lastNumber = '', operant = '';
    displayOnScreen('number', currentNumber);
    displayOnScreen('displayTop', '');
    operatorButtons.forEach( operantButton => operantButton.classList.remove("selected"))
}

// keyboard support
function handleKeyboardInput (input) {
    if (input.key >= 0 && input.key <= 9) handleNumber(input.key)
    if (input.key == ',') handleNumber('.');
    if (input.key == '+' || input.key == '-' || input.key == '*' || input.key == '/') handleOperator(input.key);
    if (input.key == 'Enter') handleOperator('=');
    if (input.key == 'Backspace') handleModeButtons('backspace');
    if (input.key == 'Escape') handleModeButtons('buttonClear');
}

function calculate (num1, num2, operant) {
    switch (operant) {
        case '+':
            displayOnScreen('result', num1 + num2);
            break;
        case '-':
            displayOnScreen('result', num1 - num2);
            break;
        case 'x':
            displayOnScreen('result', num1 * num2);
            break;
        case '/':
            displayOnScreen('result', num1 / num2);
            break;
        case '√':
            // using the second number because only one is requierd and that 
            // one becomes the second number when pressing the operator
            displayOnScreen('result', Math.sqrt(num2));
            break;
        case '^':
            displayOnScreen('result', num1 ** num2);
            break;
    }
}

// inderact with the display
function displayOnScreen(type, content) {
    const lastCalc = document.querySelector('#lastCalc')
    const result = document.querySelector('#result')
    if (type == 'number') { 
        result.textContent = +content;
    } else if (type == 'result') {
        result.textContent = Math.round(content * 100) / 100;
        lastCalc.textContent += ` ${currentNumber} =`;
        // makes it possible work with the result in next culculation
        lastNumber = Math.round(content * 100) / 100;
        currentNumber = '';
    } else if (type == 'displayTop') {
        lastCalc.textContent = content;
    }
}
