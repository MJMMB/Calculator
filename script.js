document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.button button');
    const result = document.querySelector('.result');
    let currentInput = '0';
    let firstOperand = null;
    let secondOperand = null;
    let currentOperation = null;
    let shouldResetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('Red')) {
                resetCalculator();
            } else if (button.classList.contains('bc-green')) {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });

    function resetCalculator() {
        currentInput = '0';
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
        shouldResetScreen = false;
        updateDisplay();
    }

    function handleOperator(operator) {
        if (operator === '=') {
            if (currentOperation !== null) {
                calculate();
                currentOperation = null;
            }
            return;
        }

        if (operator === '±') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay();    
            return;
        }

        if (operator === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
            return;
        }

        if (currentOperation !== null) {
            calculate();
        } else {
            firstOperand = currentInput;
        }

        currentOperation = operator;
        shouldResetScreen = true;
    }

    function handleNumber(number) {
        if (shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay();
    }

    function updateDisplay() {
        result.textContent = currentInput;
    }

    function calculate() {
        if (currentOperation === null || shouldResetScreen) return;

        secondOperand = currentInput;
        let calculation;

        switch (currentOperation) {
            case '+':
                calculation = parseFloat(firstOperand) + parseFloat(secondOperand);
                break;
            case '-':
                calculation = parseFloat(firstOperand) - parseFloat(secondOperand);
                break;
            case 'x':
                calculation = parseFloat(firstOperand) * parseFloat(secondOperand);
                break;
            case '/':
                calculation = parseFloat(firstOperand) / parseFloat(secondOperand);
                break;
        }

        currentInput = calculation.toString();
        updateDisplay();
        firstOperand = currentInput;
        shouldResetScreen = true;
    }
});


