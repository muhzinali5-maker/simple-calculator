let currentInput = "";
let previousInput = "";
let operator = "";
let shouldReset = false;

const result = document.getElementById("result");
const previous = document.getElementById("previous");

// Add numbers
function appendNumber(number) {

    if (shouldReset) {
        currentInput = "";
        shouldReset = false;
    }

    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

// Add decimal point
function appendDecimal() {

    if (shouldReset) {
        currentInput = "";
        shouldReset = false;
    }

    if (!currentInput.includes(".")) {
        currentInput = currentInput === ""
            ? "0."
            : currentInput + ".";
    }

    updateDisplay();
}

// Add operator
function appendOperator(op) {

    if (currentInput === "") return;

    if (previousInput !== "" && !shouldReset) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    shouldReset = true;

    previous.textContent =
        previousInput + " " + getSymbol(operator);
}

// Calculate result
function calculate() {

    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }

    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    let answer;

    switch (operator) {

        case "+":
            answer = num1 + num2;
            break;

        case "-":
            answer = num1 - num2;
            break;

        case "*":
            answer = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                result.value = "Cannot divide by 0";
                previous.textContent = "";
                currentInput = "";
                previousInput = "";
                operator = "";
                shouldReset = true;
                return;
            }
            answer = num1 / num2;
            break;
    }

    previous.textContent =
        previousInput + " " + getSymbol(operator) +
        " " + currentInput + " =";

    currentInput = String(
        parseFloat(answer.toPrecision(12))
    );

    previousInput = "";
    operator = "";
    shouldReset = true;

    updateDisplay();
}

// Get operator symbol
function getSymbol(op) {
    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[op];
}

// Update display
function updateDisplay() {
    result.value = currentInput || "0";
}

// Clear calculator
function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    shouldReset = false;

    result.value = "0";
    previous.textContent = "";
}