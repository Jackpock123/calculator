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
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    },

    chooseOperation: function(operation) {
        if( this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''; 
    },

    compute: function() {
        let calculatedValue
        const prev = parseFloat(this.previousOperand);        
        const current = parseFloat(this.currentOperand);        

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '%':
                calculatedValue = prev % current
                break
            case '/':
                calculatedValue = prev / current
                break
            case '*':
                calculatedValue = prev * current
                break
            case '-':
                calculatedValue = prev - current
                break
            case '+':
                calculatedValue = prev + current
                break
            default: return                
        }
        this.currentOperand = calculatedValue;
        this.previousOperand = '';
        this.operation = undefined;
    },
    
    updateDisplay: function() {
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
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

operationButtons.forEach(operation => {
    operation.addEventListener('click', function() {
        // console.log(operation.value);
        calculator.chooseOperation(operation.value);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', function() {
    // alert('I am clicked');
    calculator.compute()
    calculator.updateDisplay()
});