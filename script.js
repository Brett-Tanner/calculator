// FIXME: weird things happen on subsequent operations

// get elements
const display = document.querySelector("#display");
const inputButton = Array.from(document.querySelectorAll(".numButton, .operators"));
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");

// initialize global variables
let displayContent = 0;
let operator = null;
let num1 = null;
let num2 = null;



// EVENT LISTENERS



// Accept keyboard input
document.addEventListener("keydown", (e) => {
    let input = e.key;
    // convert keyboard inputs to operators and check for backspace/clear
    switch (input) {
        case "-":
            input = "\u2212";
            break;
        case "/":
            input = "\u00f7";
            break;
        case "*":
            input = "\u00d7";
            break;
        case "Delete":
            clearButton();
            break;
        case "Backspace":
            backspaceButton();
            break;
        case "Enter":
            getNum2();
            if ((num2 == 0 && operator === "\u00f7") || num2 === null) {
                alert("Second operator must be a valid number");
                break;
            } 
            else {
                operate(num1, num2, operator);
                break;
            }
        default:
            break;
    };
    // filter anything that's not a number or operator
    if ((input >= 0 && input < 10) || input === "+" || input === "\u2212" || input === "\u00f7" || input === "\u00d7" || input === ".") {
        addDisplay(input);
    }
    else {
        return;
    };
});

// add number and operator event listeners
for (let i = 0, length = inputButton.length; i < length; i++) {
    inputButton[i].addEventListener("click", (e) => {
        const input = e.target.textContent;
        addDisplay(input);
    });
};


// reset everything when clear button clicked
clear.addEventListener("click", clearButton);

// remove last input when backspace clicked
backspace.addEventListener("click", backspaceButton);

// do math when = is clicked
equals.addEventListener("click", () => {
    getNum2();
    operate(num1, num2, operator);
    }
);




// FUNCTIONS 





// Get num2 by slicing from index of operator
function getNum2() {    
    const operatorIndex = num1.length;
    num2 = displayContent.slice(operatorIndex + 1);
};


// call correct function when called by = button
function operate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            result = add(num1, num2);
            displayResult();
            break;
        case "\u2212":
            result = subtract(num1, num2);
            displayResult();
            break;
        case "\u00f7":
            result = divide(num1, num2);
            displayResult();
            break;
        case "\u00d7":
            result = multiply(num1, num2);
            displayResult();
            break;
    };
};

function displayResult() {
    if (Number.isInteger(result)) {
        displayContent = result.toFixed(0);
        display.textContent = result.toFixed(0);
    }
    else {
        displayContent = result.toFixed(2);
        display.textContent = result.toFixed(2);
    }
    num1 = result;
    num2 = null;
    operator = null;
};

// operator functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
}

// delete everything
function clearButton() {
        displayContent = 0;
        operator = null;
        display.textContent = 0;
        num1 = null;
        num2 = null;
};

// delete one character at a time
function backspaceButton() {
    // make sure you display 0 rather than empty box
    if (displayContent.length === 1) {
        displayContent = 0;
        display.textContent = displayContent;
        return;
    }
    const lastIndex = displayContent.length - 1;
    // zero out relevant variables if you delete an operator
    if (displayContent[lastIndex] === "+" || displayContent[lastIndex] === "\u2212" || displayContent[lastIndex] === "\u00f7" || displayContent[lastIndex] === "\u00d7") {
        operator = null;
        num1 = null;
    }
    // remove the last char
    displayContent = displayContent.slice(0, lastIndex);
    display.textContent = displayContent;
};

// use to update the display
function addDisplay(input) {
    // check if it's an operator
    if (input === "+" || input === "\u2212" || input === "\u00f7" || input === "\u00d7") {
        // prevent input if already used operator or no num1
        if (operator !== null || displayContent == 0) {
            return;
        }
        // update display and relevant variables
        else {
            operator = input;
            if (num1 === null) {
                num1 = displayContent;
            }
            displayContent += input;
            display.textContent += input;
            return;
        }
    };
    // remove placeholder 0
    if (displayContent == 0) {
        displayContent = input;
        display.textContent = displayContent;
    }
    // update if just a number
    else {
        displayContent += input;
        display.textContent = displayContent;
    }
};