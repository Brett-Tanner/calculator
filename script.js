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




// TODO: Also accept keyboard input






// add number event listeners
for (let i = 0, length = inputButton.length; i < length; i++) {
    inputButton[i].addEventListener("click", addDisplay)};

// use to update the display
function addDisplay(e) {
    const input = e.target.textContent;
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
clear.addEventListener("click", () => {
    displayContent = 0;
    operator = null;
    display.textContent = 0;
    num1 = null;
    num2 = null;
})

// remove last input when backspace clicked
backspace.addEventListener("click", function() {
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
});



// TODO: add = event listener
// will prob need to convert back to numbers but who knows with js

// This should get num2 but you'll need to test it
// const operatorIndex = displayContent.search(/\p{MathSymbol}/);
// console.log(operatorIndex);
// num2 = displayContent.slice(operatorIndex + 1);
// console.log(num2);


// get values from display when called by = button
function operate(a, b, operator) {
    switch (operator) {
        case "&#x2B":
            add(a, b);
            break;
        case "&#8722":
            subtract(a, b);
            break;
        case "&#215":
            multiply(a, b);
            break;
        case "&divide":
            divide(a, b);
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