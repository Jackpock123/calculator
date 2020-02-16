// 1. Define calculator variables

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const deleteButton = document.querySelectorAll('[data-delete]')
const clearEntryButton = document.querySelectorAll('[data-clear-entry]')
const allClearButton = document.querySelectorAll('[data-all-clear]')
const memoryRecallButton = document.querySelectorAll('[data-memory-recall]')
const memorySaveButton = document.querySelectorAll('[data-memory-save]')
const memoryClearButton = document.querySelectorAll('[data-memory-clear]')
const previousOperandOutput = document.querySelectorAll('[data-previous-operand]')
const currentOperandOutput = document.querySelectorAll('[data-previous-operand]')






















// Define variable that will take arguements

// Get value using an event listener.

var UI = {};

UI.selectClick = function() {
    [...document.querySelectorAll('.number-input-js')].forEach(function(node) {
        node.addEventListener('click', function() {
            // alert('I have been clicked baby!')
            let selectedNumber = node.value;
            // console.log(selectedNumber)
            UI.display(selectedNumber)
        })
    })    
}
UI.selectClick();

// The problem with this display function is that it resets with each click event i.e. only concatenates 
// the empty string and selectedNumber value    
UI.display = function(selectedNumber) {
    let numberStr = "";
    let displayArr = [];

    if(Number.isInteger(parseInt(selectedNumber)) || selectedNumber === '.') {
        // alert('I am a number or dot!')
        numberStr = numberStr + selectedNumber;
        displayArr.push(selectedNumber);
    }
    console.log(numberStr);
    console.log(displayArr);
}

UI.display();

// Display current number on display

// Display number in calculation summary window in display

// Flatten out array to do calculation (use a FOR loop to cocatenate everything?)