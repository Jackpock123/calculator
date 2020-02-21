// Method using the constructor type or 'blueprint'

// Declare the constructor which will hold data
function Calculator (previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
}
// Set the properties for prototype of Calculator object
// Equal to setting instance methods within a class. Note different syntax

Calculator.prototype = {
    clear: function() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    },

    delete: function() {

    },

    appendNumber: function(number) {
        this.currentOperand = this.currentOperand + number;
    },

    chooseOperation: function(operation) {

    },

    compute: function() {

    },
    
    updateDisplay: function() {
        this.currentOperandElement.innerText = this.currentOperand;
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const allClearButton = document.querySelector('[data-all-clear]')
const memoryRecallButton = document.querySelector('[data-memory-recall]')
const memorySaveButton = document.querySelector('[data-memory-save]')
const memoryClearButton = document.querySelector('[data-memory-clear]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandElement, currentOperandElement);


numberButtons.forEach( button => {
    button.addEventListener('click', function () {
        calculator.appendNumber(button.value);
        calculator.updateDisplay();
    })
});