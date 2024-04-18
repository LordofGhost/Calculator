let currentNumber = '', lastNumber = '', operant = '';

// handeling number inputs
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
        button.classList.add("selected");
        // before a second operator can be added to the calculation the last one mus be calculated
        if (operant != '' || operant == '=') { 
            if (currentNumber == '') currentNumber = lastNumber;
            calculate(+lastNumber, +currentNumber, operant);
        // when useing the quare root it doesn't requiere a second value
        } else if (button.id == 'squareRoot') {
            operant = button.textContent;
            displayOnScreen('displayTop', operant);
            calculate(+lastNumber, +currentNumber, operant);
        } else {
            // make space for the second number
            if (lastNumber == '') {
                lastNumber = currentNumber;  
                currentNumber = '';
            } 
            // store the oprator
            operant = button.textContent;
            displayOnScreen('displayTop', `${lastNumber} ${operant}`)
        }   
    });
});

// modefier buttons
const modeButtons = document.querySelectorAll('.mode');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'buttonClear':
                currentNumber = '', lastNumber = '', operant = '';
                displayOnScreen('number', '0');
                displayOnScreen('displayTop', '');
                break;
            case 'backspace':
                    currentNumber = currentNumber.slice(0, -1);
                    if (currentNumber == '') {
                        displayOnScreen('number', '0');
                    } else {
                        displayOnScreen('number', currentNumber);
                    }
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
        result.textContent = content;
    } else if (type == 'result') {
        result.textContent = Math.round(content * 100) / 100;
        lastCalc.textContent += ` ${currentNumber} =`;
        // makes it possible work with the result in next culculation
        lastNumber = content;
        currentNumber = '';
        operant = '';
    } else if (type == 'displayTop') {
        lastCalc.textContent = content;
    }
}

function selectedButton (button) {
    switch (button) {
        case '':
            break;
    }
}
