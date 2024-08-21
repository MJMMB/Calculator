document.addEventListener("DOMContentLoaded", function() {

    const result = document.querySelector(".result");
    const buttons = document.querySelectorAll(".button button");
    const errorMessageDiv = document.querySelector(".error-message");

    let currentNumber = "";
    let firstOperand = null;
    let operator = null;
    let restart = false;

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.add("show");

        setTimeout(() => {
            errorMessageDiv.classList.remove("show");
        }, 2000); // A mensagem desaparece após 2 segundos
    }

    function updateResult(originClear = false) {
        result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
    }

    function addDigit(digit) {
        if (digit === "," && (currentNumber.includes(",") || !currentNumber))
            return;

        if (restart) {
            currentNumber = digit;
            restart = false;
        } else {
            currentNumber += digit;
        }

        updateResult();
    }

    function setOperator(newOperator) {
        if (!currentNumber && !firstOperand) {
            showError("Formato usado inválido");
            return;
        }

        if (currentNumber) {
            calculate();

            firstOperand = parseFloat(currentNumber.replace(",", "."));
            currentNumber = "";
        }

        operator = newOperator;
    }

    function calculate() {
        
    
        if (currentNumber === "") {
            showError("Formato usado inválido");
            return;
        }
    
        let secondOperand = parseFloat(currentNumber.replace(",", "."));
        let resultValue;
    
        switch (operator) {
            case "+":
                resultValue = firstOperand + secondOperand;
                break;
            case "-":
                resultValue = firstOperand - secondOperand;
                break;
            case "x":
                resultValue = firstOperand * secondOperand;
                break;
            case "/":
                if (secondOperand === 0) {
                    showError("Divisão por zero não é permitida");
                    return;
                }
                resultValue = firstOperand / secondOperand;
                break;
            default:
                return;
        }
    
        if (resultValue.toString().split(".")[1]?.length > 5) {
            currentNumber = parseFloat(resultValue.toFixed(5)).toString();
        } else {
            currentNumber = resultValue.toString();
        }
    
        operator = null;
        firstOperand = null;
        restart = true;
        updateResult();
    }
    

    function clearCalculator() {
        currentNumber = "";
        firstOperand = null;
        operator = null;
        updateResult(true);
    }

    function setPercentage() {
        if (!currentNumber) {
            showError("Formato usado inválido");
            return;
        }
        let result = parseFloat(currentNumber.replace(",", ".")) / 100;

        if (["+", "-"].includes(operator)) {
            result = result * (firstOperand || 1);
        }

        if (result.toString().split(".")[1]?.length > 5) {
            result = parseFloat(result.toFixed(5)).toString();
        }

        currentNumber = result.toString();
        updateResult();
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.innerText;
            if (/^[0-9,]+$/.test(buttonText)) {
                addDigit(buttonText);
            } else if (["+", "-", "x", "/"].includes(buttonText)) {
                setOperator(buttonText);
            } else if (buttonText === "=") {
                calculate();
            } else if (buttonText === "C") {
                clearCalculator();
            } else if (buttonText === "±") {
                if (!currentNumber && !firstOperand) {
                    showError("Formato usado inválido");
                    return;
                }
                currentNumber = (
                    parseFloat(currentNumber || firstOperand) * -1
                ).toString();
                updateResult();
            } else if (buttonText === "%") {
                setPercentage();
            }
        });
    });

});
