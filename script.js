// select all input button and add a function to them
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        inputHandler(button.id, button.textContent)
    });
});

function inputHandler (id, content) {
    let num1, num2, operator;
    switch (id) {
        case 'buttonClear':
            displayOnScreen(clear);
            break;
        case 'backspace':
            break;
        case 'buttonEqual':
            operate(num1, num2, operator);
            break;
        case 'positivNegativ':
            break;
        default:
            break;
    }
}

// goes through the input and analyze it, decides how to react on it
function operate (num1, num2, operator) {
    switch (operator) {
        case '+':
            add(num1, num2)
            break;
        case '-':
            subtract(num1, num2)
            break;
        case '*':
            multiply(num1, num2)
            break;
        case '/':
            divide(num1, num2)
            break;   
        default:
            break;
    }
}

// calculations

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

// inderact with the display
function displayOnScreen (type, content) {
    const lastCalc = document.querySelector('#lastCalc')
    const result = document.querySelector('#result')
    if (type == 'number') { // adds a number to calculation
        result.textContent += content;
    } else if (type == 'result') { // prints the result and shifts the calculation to the top
        lastCalc.textContent = result.textContent;
        result.textContent = content;
    } else if (type == 'clear') { // clears the display
        lastCalc.textContent = '';
        result.textContent = '';
    }
}