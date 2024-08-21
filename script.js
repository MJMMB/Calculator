const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button")

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innertext = originClear ? 0 : currentNumber.replace(".", ",");

}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
    return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    }   else {
        currentNumber += digit;
    }  
    
    updateResult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        calculate();
        
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operator = newOperator;
}

function calculate() {
    if (oparator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.raplace(",", "."));
    let resultValue;

    switch (oparator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "X":
            resultValue = firstOperand * secondOperand;
            break;
        case "/":
            resultValue = firstOperand / secondOperand;
            break; 
        default:
        return;           
    }

    if (resultValue.toString().split(".")[1]?.Length > 5) {
        currentNumber = parseFloat(resultValue.tofixed(5)).toString();
    }   else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    percentageValue = null;
    updateResult();

}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();

}

buttons.forEach((button) => {
    button.addEventListener("click" , () => {
        const buttonText = button.innertext;
        if (/^[0-9,]+4/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "X", "/"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C") {
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResult();
        } else if (buttonText === "%") {
            setPercentage();
        }
    });
});

