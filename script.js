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
        if (operant != '' || operant == '=') { // before a second operator can be added to the calculation the last one mus be calculated
            calculate(+lastNumber, +currentNumber, operant);
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
                currentNumber = '', lastNumber = '', operant = '';
                displayOnScreen('number', currentNumber);
                break;
            case 'backspace':
                    currentNumber = currentNumber.slice(0, -1);
                    displayOnScreen('number', currentNumber);
                break;
        }
    });
});

const negativPositiv = document.querySelector('#negativPositiv');
negativPositiv.addEventListener('click', () => {
    // makes a positiv a number negativ and other way around 
    currentNumber *= -1;
    displayOnScreen('number', currentNumber);
});

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
            displayOnScreen('result', Math.sqrt(num1));
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
        result.textContent = content;
    } else if (type == 'result') {
        result.textContent = content;
        // makes it possible work with the result in next culculation
        lastNumber = content;
        currentNumber = '';
    } else if (type == 'clear') { 
        // clears the display
        lastCalc.textContent = '0';
        result.textContent = '0';
    }
}
