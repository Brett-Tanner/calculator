// get elements
const display = document.querySelector("#display");
const inputButton = Array.from(document.querySelectorAll(".numButton, .operators"));
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");

// initialize global variables
let displayContent = 0;
let operator = null;
let num1 = null;
let num2 = null;


// Accept keyboard input TODO: for equals
document.addEventListener("keydown", (e) => {
    let input = e.key;
    console.log(input);
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
        case "Delete":
            clearButton();
            break;
        case "Backspace":
            backspaceButton();
            break;
        default:
            break;
    };
    // filter anything that's not a number or operator
    if ((input >= 0 && input < 10) || input === "+" || input === "\u2212" || input === "\u00f7" || input === "\u00d7") {
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

// use to update the display
function addDisplay(input) {
    // check if it's an operator
    if (input === "+" || input === "\u2212" || input === "\u00f7" || input === "\u00d7") {
        // prevent input if already used operator
        if (operator !== null || display.textContent == 0) {
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

// reset everything when clear button clicked
clear.addEventListener("click", clearButton);

// remove last input when backspace clicked
backspace.addEventListener("click", backspaceButton);



// TODO: add = (result) event listener
// will prob need to convert back to numbers but who knows with js

// This should get num2 but you'll need to test it
// const operatorIndex = displayContent.search(/\p{MathSymbol}/);
// console.log(operatorIndex);
// num2 = displayContent.slice(operatorIndex + 1);
// console.log(num2);


// FUNCTIONS BELOW HERE


// get values from display when called by = button
function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            add(num1, num2);
            break;
        case "\u2212":
            subtract(num1, num2);
            break;
        case "\u00f7":
            multiply(num1, num2);
            break;
        case "\u00d7":
            divide(num1, num2);
            break;
    };
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

function clearButton() {
        displayContent = 0;
        operator = null;
        display.textContent = 0;
        num1 = null;
        num2 = null;
};

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