// Method using class syntax
// Create Calculator class to store data

class Calculator {
    // Instance properties
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        // Boolean to flag if computation has just been completed
        this.calculationBoolean = false;
        // Set to default values
        this.allClear();
    }
    // Instance methods --> Will sit in the object's prototype
    allClear() {
        // Set both operands as empty strings
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    clearEntry() {
        // Set currentoperand to 0
        this.currentOperand = '0';    }

    delete() {
        // Do not need to split the string to slice()
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    reverseSign() {
        this.currentOperand = this.currentOperand * -1;
    }

    appendNumber(number) {
        // Number is passed in as an arguement from the button.addEventListener
        // Verify numbers are strings with toString()
        
        // Define behaviour if Boolean === true and number === decimal
        // If compute() has executed this will execute and reset boolean to false.
        if(this.calculationBoolean === true && number === '.') {
            this.currentOperand = '0' + number.toString();
            this.calculationBoolean = false;
            // alert('Boolean 1 is true');
            return
        }
        // Define behaviour if Boolean === true and number !== decimal
        // If compute() has executed this will execute and reset boolean to false.
        if(this.calculationBoolean === true) {
            this.currentOperand = number.toString();
            this.calculationBoolean = false;
            // alert('Boolean 2 is true');
            return
        }

        // Define behaviour if Boolean === false
        // Check if currentOperand already contains a decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Check to limit 0s before decimal to 1
        if (number === '0' && this.currentOperand === '0') return;
        // Limit length of string
        if (this.currentOperand.length > 14) return;

        // Now we know currentOperand !include('.') define behaviour of decimal value
        // Case when this.currentOperand === undefined after this operation is selected by user     
        if (number === '.' && this.currentOperand === '') {
            this.currentOperand = '0' + number.toString();
            return           
        }
        // Case if decimal is selected
        if (number === '.') {
            this.currentOperand = this.currentOperand.toString() + number.toString();
            return           
        }
        // Case where number !== 0 is selected
        if (this.currentOperand !== '0') {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        // Case when first number is selected and number !== decimal
        if (this.currentOperand === '0' && this.currentOperand.length === 1) {
            this.currentOperand = number.toString();
        }
    }

    chooseOperation(operation) {
        // Number is passed in from the operation.addEventListener
        // Add check in to stop code if there is no currentOperand
        if(this.currentOperand === '') return
        // Check if there is anything in previousOperand. If yes call compute() 
        if(this.previousOperand !== '') {
            this.compute();
            // Add return function to stop following code overwriting calculated values
            return
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';   
        //console.log(this.previousOperand);        
        
    }

    compute() {
        // Declare variable which will be our computed value
        // Note to self, make sure you spell variables correctly! 
        let calculatedValue
        // Convert string into number
        const prev = parseFloat(this.previousOperand);        
        const current = parseFloat(this.currentOperand);        
        // If either is NaN then exit function
        if (isNaN(prev) || isNaN(current)) return
        // console.log(prev);
        // console.log(current);
        // console.log(this.operation);
        // Depending on our operator value, compute calculatedValue
        switch (this.operation) {
            case '%':
                calculatedValue = ((prev*10) % (current*10)) / 10;
                break
            case '/':
                calculatedValue = (prev*10) / (current*10);
                break
            case '*':
                calculatedValue = ((prev*10) * (current*10)) / 100;
                break
            case '-':
                calculatedValue = ((prev*10) - (current*10)) / 10;
                break
            case '+':
                calculatedValue = ((prev*10) + (current*10)) / 10;
                break
            default: return                
        }
        this.currentOperand = calculatedValue;
        this.previousOperand = '';
        this.operation = undefined;
        // Set out flag to true as calculation has been executed
        this.calculationBoolean = true;
        // console.log(this.currentOperand); 
    }

    updateDisplay() {
        // The string in the calculator object is inserted into the currentOperand output
        this.currentOperandElement.innerText = this.currentOperand;
        // console.log('previousOperand: ', this.previousOperand);
        // console.log('operation: ', this.operation);
        // console.log('currentOperand: ', this.currentOperand);
        if(this.operation != null) {
            this.previousOperandElement.innerText = 
            `${this.previousOperand} ${this.operation}`;
        }
        if (this.operation == null) {
            this.previousOperandElement.innerText = '';
        }
    }    

} 

// Define calculator variables

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[data-sign]')
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
    // alert('I am clicked');
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', function() {
    // alert('delete is clicked');
    calculator.delete();
    calculator.updateDisplay();
})

clearEntryButton.addEventListener('click', function() {
    calculator.clearEntry();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', function() {
    calculator.allClear();
    calculator.updateDisplay();
});

signButton.addEventListener('click', function() {
    // alert('delete is clicked');
    calculator.reverseSign();
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