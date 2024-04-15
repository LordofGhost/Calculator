let currentNumber = '', lastNumber = '', operant = '';

// select all input buttons for numbers
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // add number to string
        currentNumber += button.textContent;
        displayOnScreen('number', currentNumber);
    });
});

// select all input buttons for operators
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operant != '') { // before a second operator can be added to the calculation the last one mus be calculated

        } else {
            // make space for the second number
            lastNumber = currentNumber;
            currentNumber = '';
            // store the oprator
            operant = button.textContent;
        }   
    });
});

// select all input buttons for modefier
const modeButtons = document.querySelectorAll('.mode');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'buttonClear':
                break;
            case 'backspace':
                break;
        }
    });
});

const negativPositiv = document.querySelector('#negativPositiv');
negativPositiv.addEventListener('click', () => {
    currentNumber *= -1;
    displayOnScreen('number', currentNumber);
});



// goes through the input and analyze it, decides how to react on it
function calculate (val1, val2, operant) {
    switch (operant) {
        case '+':
            displayOnScreen('result', val1 + val2);
            break;
        case '-':
            displayOnScreen('result', val1 - val2);
            break;
        case 'x':
            displayOnScreen('result', val1 * val2);
            break;
        case '/':
            displayOnScreen('result', val1 / val2);
            break;
        case '√':
            displayOnScreen('result', Math.sqrt(val1));
            break;
        case '^':
            displayOnScreen('result', val1 ** val2);
            break;
    }
}

// inderact with the display
function displayOnScreen(type, content) {
    const lastCalc = document.querySelector('#lastCalc')
    const result = document.querySelector('#result')
    if (type == 'number') { // adds a number to calculation
        result.textContent = content;
    } else if (type == 'result') { // prints the result and shifts the calculation to the top
        // lastCalc.textContent = result.textContent;
        result.textContent = content.toFixed(2);
    } else if (type == 'clear') { // clears the display
        lastCalc.textContent = '0';
        result.textContent = '0';
    }
}

function reset() {

}