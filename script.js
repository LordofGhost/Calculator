let num1, num2, operator;
const lastCalc = document.querySelector('#lastCalc')
const result = document.querySelector('#result')

// select all input button and add a function to them
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.textContent)
    });
});

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
