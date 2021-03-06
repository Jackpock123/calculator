// **Method using class syntax**
// Step 1. Declare class as blueprint for object which will store data

class Calculator {
    // ** Instance properties**
    constructor(previousOperandElement, currentOperandElement, element) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        // Boolean to flag if computation has just been completed
        this.calculationBoolean = false;
        // Set to default values
        this.allClear();        
        // Properties for historyList
        this.listElement = element;        
        this.textList = ['Calculation History:'];        
    }
    // **Instance methods for calculator** --> Methods sit in the object's prototype
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
        // Case when this.currentOperand === undefined after this.operation is selected by user     
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
        // Depending on our operator value, compute calculatedValue
        switch (this.operation) {
            case '%':
                calculatedValue = ((prev*10) % (current*10)) / 10;
                break
            case '÷':
                calculatedValue = (prev*10) / (current*10);
                break
            case 'x':
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
        // Update calculation history list
        this.addListItem(calculatedValue);
        this.updateList();
        // Update for result of calculation
        this.currentOperand = calculatedValue;
        this.previousOperand = '';
        this.operation = undefined;
        // Set out flag to true as calculation has been executed
        this.calculationBoolean = true;
    }

    updateDisplay() {
        // The string in the calculator object is inserted into the currentOperand output
        this.currentOperandElement.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandElement.innerText = 
            `${this.previousOperand} ${this.operation}`;
        }
        if (this.operation == null) {
            this.previousOperandElement.innerText = '';
        }
    }


    // **Instance methods to create calculation history ul**
    static createListItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
    }

    // Helper function to toggle display of calculation history
    recallHistory() {
        let calculationHistory = document.querySelector('.calculation-history');
        calculationHistory.classList.toggle('history-active');
        if(calculationHistory.style.display === 'block') {
            calculationHistory.style.display = 'none';
        } else {
            calculationHistory.style.display = 'block';
        }
    }

    updateList() {
        // alert('updateList is running')
        // Remove all existing li
        while (this.listElement.firstChild) {
            this.listElement.removeChild(this.listElement.firstChild);
        }
        // For each element in textList create a li and append to this.listElement
        for(const text of this.textList) {
            this.listElement.appendChild(Calculator.createListItem(text));
        }
    }

    clearList() {
        this.textList = ['Calculation History:'];
    }
    // Each time compute() is called, create string and push to textList
    addListItem (calculatedValue) {
        this.textList.push(`${this.previousOperand} ${this.operation} ${this.currentOperand} = ${calculatedValue}`)
    }

}    

// Step 2. Define variables
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[data-sign]')
const recallHistoryButton = document.querySelector('[data-history-recall]')
const clearHistoryButton = document.querySelector('[data-history-clear]')
const myList = document.querySelector('[data-history-list]')

// Step 3. Create a new instance of Calculator called calculator and pass in 3 properties
const calculator = new Calculator(previousOperandElement, currentOperandElement, myList);

// Step 4. Declare event listener functions
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        // console.log(button.value)
        // Pass arguement into appendNumber method for calculator object
        calculator.appendNumber(button.value);
        // console.log(button.value);
        calculator.updateDisplay();
    })    
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', function() {
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

recallHistoryButton.addEventListener('click', function() {
    // alert('recallHistoryButton is clicked');
    calculator.recallHistory();
    this.classList.toggle('recall-active-js');
})

clearHistoryButton.addEventListener('click', function() {
    // alert('clearList is clicked');
    calculator.clearList();
    calculator.updateList();
})