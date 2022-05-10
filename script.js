// get elements
const display = document.querySelector("#display");
const inputButton = Array.from(document.querySelectorAll(".numButton, .operators"));
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");

// initialize displayContent and operator
let displayContent = 0;
let operator = null;

// add number event listeners
for (let i = 0, length = inputButton.length; i < length; i++) {
    inputButton[i].addEventListener("click", addDisplay)};

// add correction event listeners
backspace.addEventListener("click", function(e) {
    console.log(e.target.id);
});

// use to update the display
function addDisplay(e) {
    const input = e.target.textContent;
    // check if it's an operator
    if (input === "+" || input === "\u2212" || input === "\u00f7" || input === "\u00d7") {
        // prevent input if already used operator
        if (operator !== null || display.textContent == 0) {
            return;
        }
        else {
            operator = input;
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
    else {
        displayContent += input;
        display.textContent = displayContent;
    }
};

// get values from display
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