// Method using class syntax
// Create Calculator class to store data

class Calculator {
    // Instance properties
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        // Set to default values
        this.clear();
    }
    // Instance methods --> Will sit in the object's prototype
    clear() {
        // Set both operands as empty strings
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
        console.log(this.previousOperand);
        console.log(this.currentOperand);
        console.log(this.operation);
    }

    delete() {

    }

    appendNumber(number) {
        // Number is passed in as an arguement from the button.addEventListener
        // Verify if currentOperand already contains a decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Verify numbers are strings with toString()
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // Number is passed in from the operation.addEventListener
        // Add check in to stop code if there is no currentOperand
        if(this.currentOperand === '') return
        // Check if there is anything in previousOperand. If yes call compute() 
        if(this.previousOperand !== '') {
            console.log('The previous operand is not an empty string');
            this.compute();
            // Use return here so next statements doesn't reset operation value
            return
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';   
    
        // console.log(this.previousOperand);
        // console.log(this.currentOperand);
        // console.log(this.operation);
    }

    compute() {
        alert('calling the compute method');
        console.log(this.previousOperand);
        console.log(this.currentOperand);
        // Declare variable which will be our computed value
        // Note to self, make sure you spell variables correctly! 
        let calculatedValue
        // Convert string into number
        const prev = parseFloat(this.previousOperand);        
        const current = parseFloat(this.currentOperand);        
        // If either is NaN then exit function
        if (isNaN(prev) || isNaN(current)) return
        console.log(prev);
        console.log(current);
        console.log(this.operation);
        // Depending on our operator value, compute calculatedValue
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
        console.log(calculatedValue);
        this.currentOperand = calculatedValue;
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        // The string in the calculator object is inserted into the currentOperand output
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
    }

} 

// Define calculator variables

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

// Create a new instance of Calculator called calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Add event listeners

numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        // console.log(button.value)
        // Pass arguement into appendNumber method for calculator object
        // Used button.value instead of .innerText --> surplus code in HTML? 
        calculator.appendNumber(button.value);
        // console.log(button.value);
        calculator.updateDisplay();
    })    
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', function() {
        // console.log(operation.value);
        calculator.chooseOperation(operation.value);
        // console.log(operation.value);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', function() {
    // alert('Equals is clicked');
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', function() {
    // alert('allClear is clicked');
    calculator.clear();
    calculator.updateDisplay();
})



















// Define variable that will take arguements

// Get value using an event listener.

// var UI = {};

// UI.selectClick = function() {
//     [...document.querySelectorAll('.number-input-js')].forEach(function(node) {
//         node.addEventListener('click', function() {
//             // alert('I have been clicked baby!')
//             let selectedNumber = node.value;
//             // console.log(selectedNumber)
//             UI.display(selectedNumber)
//         })
//     })    
// }
// UI.selectClick();

// The problem with this display function is that it resets with each click event i.e. only concatenates 
// the empty string and selectedNumber value    
// UI.display = function(selectedNumber) {
//     let numberStr = "";
//     let displayArr = [];

//     if(Number.isInteger(parseInt(selectedNumber)) || selectedNumber === '.') {
//         // alert('I am a number or dot!')
//         numberStr = numberStr + selectedNumber;
//         displayArr.push(selectedNumber);
//     }
//     console.log(numberStr);
//     console.log(displayArr);
// }

// UI.display();

// Display current number on display

// Display number in calculation summary window in display

// Flatten out array to do calculation (use a FOR loop to cocatenate everything?)