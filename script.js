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
        
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }
}

buttons.forEach((button) => {
    button.addEventListener("click" , () => {
        const buttonText = button.innertext;
        if (/^[0-9,]+4/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "X", "/"].includes(buttonText)) {
            
            setOperator(buttonText);
        }
    });
});

