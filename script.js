// select all input button and add a function to them
const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        inputHandler(button.id, button.textContent, button.className)
    });
});

function inputHandler (id, content, className) {
    const display = document.querySelector('#result')
    let isOperatorPressed = false; // this variable is to check if already a operator is in the calculation
    switch (id) {
        case 'buttonClear':
            displayOnScreen('clear');
            break;
        case 'backspace':
            display.textContent = display.textContent.slice(0, -1);
            break;
        case 'buttonEqual':
            operate(display.textContent);
            break;
        case 'negativ':
            display.textContent += '-'
            break;
        case 'squareRoot':
            display.textContent += content;
            operate(display.textContent)
            break;
        default:
            display.textContent += content;
            if (isOperatorPressed) {
                operate(display.textContent);
                isOperatorPressed = false;
            }
            if (className = 'operator') isOperatorPressed = true;
            break;
    }
}

// goes through the input and analyze it, decides how to react on it
function operate (string) {
    const arr = string.split(' ')
    switch (arr[1]) {
        case '+':
            displayOnScreen('result', parseFloat(arr[0]) + parseFloat(arr[2]));
            break;
        case '-':
            displayOnScreen('result', parseFloat(arr[0]) - parseFloat(arr[2]));
            break;
        case 'x':
            displayOnScreen('result', parseFloat(arr[0]) * parseFloat(arr[2]));
            break;
        case '/':
            displayOnScreen('result', parseFloat(arr[0]) / parseFloat(arr[2]));
            break;
        case '√':
            displayOnScreen('result', Math.sqrt(parseFloat(arr[0])));
            break;
        case '^':
            displayOnScreen('result', parseFloat(arr[0]) ** parseFloat(arr[2]));
            break;
    }
}

// inderact with the display
function displayOnScreen(type, content) {
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
